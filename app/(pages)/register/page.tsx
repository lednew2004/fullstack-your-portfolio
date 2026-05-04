"use client";

import { registerUser } from "@/app/actions/register";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginUser() {
    try {
      await registerUser({
        name,
        username,
        email,
        password,
      });

      window.location.href = "/login";
    } catch (error: any) {
      console.log("Erro:", error.message);
    }
  }

  return (
    <div className="max-w-full h-225 relative overflow-hidden">
      <div className="left-28 top-52 absolute inline-flex flex-col justify-start items-start gap-10">
        <div className="flex flex-col justify-start items-start gap-10">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-slate-100 text-4xl font-bold ">
              Acesse a plataforma
            </div>
            <div className="w-80 justify-start text-slate-200 text-base ">
              Faça login ou registre-se para começar a construir seus projetos
              ainda hoje.
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-8">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="justify-start text-slate-100 text-sm font-semibold">
                Name
              </div>
              <div className="w-96 px-3 py-4 border-b  rounded outline-1 -outline-offset-1 outline-slate-200 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-300 text-sm ">
                  <input
                    type="text"
                    placeholder="Digite seu Nome"
                    className="outline-0"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <div className="justify-start text-slate-100 text-sm font-semibold">
                UserName
              </div>
              <div className="w-96 px-3 py-4 border-b  rounded outline-1 -outline-offset-1 outline-slate-200 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-300 text-sm ">
                  <input
                    type="text"
                    placeholder="Crie seu username único"
                    className="outline-0"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
              <div className="justify-start text-slate-100 text-sm font-semibold">
                E-mail
              </div>
              <div className="w-96 px-3 py-4 border-b  rounded outline-1 -outline-offset-1 outline-slate-200 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-300 text-sm ">
                  <input
                    type="text"
                    placeholder="Digite seu e-mail"
                    className="outline-0"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="justify-start text-slate-100 text-sm font-semibold">
                  Senha
                </div>
              </div>
              <div className="w-96 px-3 py-4  rounded outline -outline-offset-1 outline-slate-200 inline-flex justify-start items-center gap-2.5">
                <div className="flex-1 flex justify-between items-center">
                  <div className="justify-start text-slate-300 text-sm ">
                    <input
                      type="password"
                      placeholder="Crie uma senha"
                      className="outline-0 w-90"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleLoginUser}
            className="w-96 px-6 py-4 bg-lime-500 hover:bg-lime-400 cursor-pointer rounded text-zinc-100 text-base font-bold"
          >
            Criar
          </button>
          <div className="justify-start">
            <span className="text-slate-300 text-base ">
              Já possui uma conta ?
            </span>
            <a href="/login">
              <span className="text-lime-400 hover:text-lime-500 cursor-pointer text-base font-bold">
                Login
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-40 h-14 left-28 top-10 absolute overflow-hidden">
        <div>login</div>
      </div>

      <div className="right-28 top-45 absolute w-130 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="text-slate-100 text-4xl font-bold leading-tight">
            Crie um portfólio que realmente impressiona
          </div>
          <div className="text-slate-300 text-lg  leading-relaxed">
            Mostre seus projetos, organize suas informações profissionais e
            construa uma presença online que destaca você no mercado.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
            <div className="text-slate-200 text-base ">
              Adicione projetos com imagens, descrições e links detalhados
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
            <div className="text-slate-200 text-base ">
              Centralize todas as suas redes sociais em um único perfil
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
            <div className="text-slate-200 text-base ">
              Personalize suas informações e destaque suas habilidades
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
            <div className="text-slate-200 text-base ">
              Compartilhe seu portfólio com um link único e profissional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
