"use client";

import { ProfileData } from "@/app/actions/get-profile";
import { saveProfile } from "@/app/actions/save-profile";
import Button from "@/app/components/button";
import Modal from "@/app/components/modal";
import { TextArea } from "@/app/components/text-area";
import TextInput from "@/app/components/text-input";
import {
  compressFile,
  handleImageInput,
  triggerImageInput,
} from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import { LuArrowUpFromLine } from "react-icons/lu";

export default function EditUserCard({
  profileData,
}: {
  profileData: ProfileData;
}) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(
    profileData.urlImage ?? null,
  );
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [yourName, setYourName] = useState(profileData.name);
  const [yourBiography, setYourBiography] = useState(
    profileData.biography ?? "",
  );
  const [yourRole, setYourRole] = useState(profileData.role ?? "");

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    try {
      const compressedFile = profileFile
        ? await compressFile([profileFile])
        : null;

      const formData = new FormData();

      formData.append("yourName", yourName);
      formData.append("yourRole", yourRole);
      formData.append("yourBiography", yourBiography);

      if (compressedFile?.[0]) {
        formData.append("profilePic", compressedFile[0]);
      }

      await saveProfile(formData);

      startTransition(() => {
        setIsModalOpen(false);
        router.refresh();
      });
    } finally {
      setIsSavingProfile(false);
    }
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <FaUserPen className="text-2xl cursor-pointer text-lime-400 hover:text-lime-300" />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-zinc-950 w-full max-w-xl md:max-w-5xl lg:max-w-4xl p-4 md:p-8 rounded-2xl flex flex-col gap-6 md:gap-10 max-h-[90vh] overflow-y-auto">
          <p className="text-white font-bold text-xl">Editar perfil</p>

          <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 justify-end">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-20 h-20 md:w-25 md:h-25 rounded-xl bg-zinc-800 overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("profile-pic-input")}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                onClick={() => triggerImageInput("profile-pic-input")}
                className="text-white flex items-center gap-2"
              >
                <LuArrowUpFromLine className="size-4" />
                <span>Adicionar foto</span>
              </button>

              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setProfileFile(file);
                  setProfilePic(handleImageInput(e));
                }}
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">Seu nome</label>
                <TextInput
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">Seu cargo</label>
                <TextInput
                  value={yourRole}
                  onChange={(e) => setYourRole(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">Descrição</label>
                <TextArea
                  className="h-36"
                  placeholder="Fale um pouco sobre você"
                  value={yourBiography}
                  onChange={(e) => setYourBiography(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>

            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
