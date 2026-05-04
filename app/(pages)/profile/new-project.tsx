"use client";

import { createProject } from "@/app/actions/create-project";
import Button from "@/app/components/button";
import Modal from "@/app/components/modal";
import { TextArea } from "@/app/components/text-area";
import TextInput from "@/app/components/text-input";

import { compressFile } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { LuArrowUpFromLine } from "react-icons/lu";

export default function NewProject({
  canCreateProject,
}: {
  canCreateProject: boolean;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [technologies, setTechnologies] = useState<string[]>([]);

  const techOptions = [
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "php",
    "python",
    "postgresql",
    "tailwind",
  ];

  const handlerOpenModal = () => {
    setIsOpen(true);
  };

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return imageUrl;
    }

    return null;
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);
    const imagesInput = document.getElementById(
      "imageInput",
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFile(Array.from(imagesInput.files));

    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);
    formData.append("techs", JSON.stringify(technologies));

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName("");
      setProjectDescription("");
      setProjectUrl("");
      setProjectImage(null);
      router.refresh();
    });
  }

  function toggleTechnology(tech: string) {
    setTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  }

  return (
    <>
      <button
        onClick={handlerOpenModal}
        disabled={!canCreateProject}
        className={`w-85 h-33 rounded-[20px] flex items-center gap-2 justify-center border-dashed transition ${canCreateProject ? "cursor-pointer bg-zinc-900 hover:border border-lime-600" : "cursor-not-allowed bg-zinc-800 opacity-50"}`}
      >
        <BiPlus className="size-10 text-green-500" />
        <span>Novo projeto</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-zinc-950 p-4 sm:p-8 rounded-[20px] flex flex-col gap-6 sm:gap-10 w-full max-w-3xl">
          <p className="text-white font-bold text-lg sm:text-xl">
            Novo projeto
          </p>

          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* IMAGE */}
            <div className="flex flex-col items-center gap-3 text-xs w-full lg:w-auto">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project Image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    className="w-full h-full text-xs text-neutral-400"
                    onClick={() => triggerImageInput("imageInput")}
                  >
                    Adicionar imagem
                  </button>
                )}
              </div>

              <button
                className="text-white flex items-center gap-2 text-sm"
                onClick={() => triggerImageInput("imageInput")}
              >
                <LuArrowUpFromLine className="size-4" />
                <span>Upload imagem</span>
              </button>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">
                  Título do projeto
                </label>

                <TextInput
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">Descrição</label>

                <TextArea
                  placeholder="Fale sobre seu projeto"
                  className="h-28 sm:h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white font-bold">URL do projeto</label>

                <TextInput
                  type="url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>

              {/* TECHS */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-bold">Tecnologias</label>

                <div className="flex flex-wrap gap-2">
                  {techOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTechnology(tech)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        technologies.includes(tech)
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-zinc-800 text-white border-zinc-700"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-white order-2 sm:order-1"
            >
              Voltar
            </button>

            <Button
              onClick={handleCreateProject}
              className="order-1 sm:order-2"
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
