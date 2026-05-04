"use client";

import { getTechs } from "@/app/actions/get-techs";
import { saveUserSkills } from "@/app/actions/save-user-skills";
import Button from "@/app/components/button";
import Modal from "@/app/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Tech = {
  id: string;
  name: string;
};

export default function AddSkills({ userId }: { userId: string }) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techs, setTechs] = useState<Tech[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const filteredTechs = techs.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase()),
  );

  function addTech(name: string) {
    if (selectedTechs.includes(name)) return;

    setSelectedTechs((prev) => [...prev, name]);
  }

  function removeTech(name: string) {
    setSelectedTechs((prev) => prev.filter((t) => t !== name));
  }

  useEffect(() => {
    async function loadTechs() {
      const data = await getTechs();
      setTechs(data);
    }

    loadTechs();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-77.25 h-12 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
      >
        <span className="text-zinc-100 font-bold text-[15px] ">
          Adicionar tecnologias que você domina
        </span>
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-zinc-950 p-8 rounded-[20px] flex flex-col gap-6 w-100">
          <p className="text-white font-bold text-xl">Adicionar tecnologias</p>

          {/* 🔍 Input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tecnologia..."
            className="p-3 rounded-lg bg-zinc-800 text-white outline-none"
          />

          {/* 📌 Selecionadas */}
          <div className="flex flex-wrap gap-2">
            {selectedTechs.map((tech) => (
              <div
                key={tech}
                className="bg-lime-500 text-black px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tech}
                <button onClick={() => removeTech(tech)}>✕</button>
              </div>
            ))}
          </div>

          {/* 📋 Lista */}
          <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
            {filteredTechs.map((tech) => (
              <button
                key={tech.id}
                onClick={() => addTech(tech.name)}
                className="text-left p-2 bg-zinc-800 hover:bg-zinc-700 rounded"
              >
                {tech.name}
              </button>
            ))}
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-white"
            >
              Cancelar
            </button>

            <Button
              onClick={async () => {
                await saveUserSkills(userId, selectedTechs);
                router.refresh();
                setIsModalOpen(false);
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
