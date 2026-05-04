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
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16">
        {/* LEFT - FORM */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          {/* HEADER */}
          <div className="flex flex-col gap-4">
            <h1 className="text-slate-100 text-3xl md:text-4xl font-bold">
              Acesse a plataforma
            </h1>
            <p className="text-slate-300 text-base max-w-md">
              Faça login ou registre-se para começar a construir seus projetos
              ainda hoje.
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-6">
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-100 text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Digite seu Nome"
                className="w-full max-w-md px-3 py-4 border-b border-slate-600 bg-transparent outline-none text-slate-300"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* USERNAME */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-100 text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                placeholder="Crie seu username único"
                className="w-full max-w-md px-3 py-4 border-b border-slate-600 bg-transparent outline-none text-slate-300"
                onChange={(e) => setusername(e.target.value)}
                value={username}
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-100 text-sm font-semibold">
                E-mail
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full max-w-md px-3 py-4 border-b border-slate-600 bg-transparent outline-none text-slate-300"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-100 text-sm font-semibold">
                Senha
              </label>
              <input
                type="password"
                placeholder="Crie uma senha"
                className="w-full max-w-md px-3 py-4 border-b border-slate-600 bg-transparent outline-none text-slate-300"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLoginUser}
              className="w-full max-w-md px-6 py-4 bg-lime-500 hover:bg-lime-400 transition rounded text-zinc-100 font-bold"
            >
              Criar conta
            </button>

            {/* LOGIN LINK */}
            <div>
              <span className="text-slate-300">Já possui uma conta? </span>
              <a
                href="/login"
                className="text-lime-400 hover:text-lime-500 font-bold"
              >
                Login
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-slate-100 text-3xl md:text-4xl font-bold leading-tight">
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
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full" />
                <p className="text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
