"use client";

import { loginUser } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCube } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLoginUser() {
    try {
      await loginUser({ email, password });
      router.push("/profile");
    } catch (error: any) {
      console.log("Erro login:", error.message);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:block bg-black">
      {/* HEADER LOGO */}
      <div className="w-full flex justify-center lg:justify-start px-6 lg:px-0 lg:absolute lg:left-28 lg:top-10 mt-6 lg:mt-0">
        <div className="flex gap-1 items-center">
          <BiCube size={35} className="text-lime-300" />
          <span className="text-2xl font-bold text-white font-mono">Your</span>
          <span className="text-2xl font-bold text-lime-400 font-mono underline">
            Portfolio
          </span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full flex flex-col lg:block">
        {/* LEFT FORM */}
        <div className="w-full lg:w-auto px-6 lg:px-0 lg:absolute lg:left-28 lg:top-52 flex flex-col gap-10 mt-10 lg:mt-0">
          {/* TITLE */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-100">
              Acesse a plataforma
            </h1>

            <p className="w-full lg:w-80 text-slate-200 text-base">
              Faça login ou registre-se para começar a construir seus projetos
              ainda hoje.
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-6">
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-100 text-sm font-semibold">
                E-mail
              </label>

              <input
                type="text"
                placeholder="Digite seu e-mail"
                className="w-full lg:w-96 px-3 py-4 rounded border border-slate-200 bg-transparent text-white outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="text-slate-100 text-sm font-semibold">
                  Senha
                </label>

                <span className="text-lime-400 text-sm font-semibold cursor-pointer">
                  Esqueceu a senha?
                </span>
              </div>

              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full lg:w-96 px-3 py-4 rounded border border-slate-200 bg-transparent text-white outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLoginUser}
              className="w-full lg:w-96 px-6 py-4 bg-lime-500 hover:bg-lime-400 rounded text-black font-bold"
            >
              Entrar
            </button>

            {/* LINK */}
            <div className="text-sm lg:text-base">
              <span className="text-slate-300">Ainda não tem uma conta? </span>

              <a href="/register" className="text-lime-400 font-bold">
                Inscreva-se
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (DESKTOP ONLY) */}
        <div className="hidden lg:flex lg:absolute right-28 top-45 w-130 flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-slate-100">
              Crie um portfólio que realmente impressiona
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              Mostre seus projetos, organize suas informações profissionais e
              construa uma presença online que destaca você no mercado.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              "Adicione projetos com imagens, descrições e links detalhados",
              "Centralize todas as suas redes sociais em um único perfil",
              "Personalize suas informações e destaque suas habilidades",
              "Compartilhe seu portfólio com um link único e profissional",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
                <div className="text-slate-200">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
