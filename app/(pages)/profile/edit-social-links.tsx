"use client";

import createSocialLinks from "@/app/actions/create-social-links";
import Button from "@/app/components/button";
import Modal from "@/app/components/modal";
import TextInput from "@/app/components/text-input";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function EditSocialLinks() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);

    await createSocialLinks({
      github,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl bg-[#2E2E2E] hover:bg-[#3E3E3E] cursor-pointer"
      >
        <BiPlus />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-zinc-950 p-8 rounded-[20px] flex flex-col gap-10 w-128.5">
          <p className="text-white font-bold text-xl">
            Adicionar redes sociais
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BsGithub />
              <TextInput
                placeholder="Link Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <LiaLinkedin />
              <TextInput
                placeholder="Link LinkedIn"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <BsInstagram />
              <TextInput
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <BsTwitter />
              <TextInput
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>

            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
