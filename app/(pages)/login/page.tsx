"use client";

import { loginUser } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { BsArrowBarLeft } from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleLoginUser() {
    const res = await loginUser({ email, password });
    if (res?.error) {
      setErrorMessage(res.error);
      return;
    }

    router.push("/profile");
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:block">
      {/* HEADER LOGO */}
      <div className="w-full flex justify-center lg:justify-start px-6 lg:px-0 lg:absolute lg:left-28 lg:top-10 mt-6 lg:mt-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 cursor-pointer flex items-center justify-center text-white hover:text-lime-400 transition"
        >
          <BsArrowBarLeft size={22} />
        </button>
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
              </div>

              <div className="relative w-full lg:w-96">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full px-3 py-4 rounded border border-slate-200 bg-transparent text-white outline-none pr-12"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              {errorMessage && (
                <div className="w-full lg:w-96 px-3 py-2 rounded bg-red-500/10 border border-red-500 text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}
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
