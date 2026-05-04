import Link from "next/link";
import { BiCube } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";
import { SiCss, SiHtml5, SiJavascript, SiPhp, SiReact } from "react-icons/si";
import { ScrollButton } from "./components/scroll-button";
import ClientProfile from "./u/[userName]/client-profile";

export default async function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center text-white">
      {/* NAVBAR */}
      <nav className="w-full max-w-7x1 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <BiCube size={35} className="text-lime-300 sm-size-[35px]" />
          <span className="text-lg sm:text-2xl font-bold text-white font-mono">
            Your
          </span>
          <span className="text-lg sm:text-2xl font-bold text-lime-400 font-mono underline">
            Portfolio
          </span>
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <ScrollButton target="home" />
          <ScrollButton target="examples" />
          <ScrollButton target="pricing" />
          <ScrollButton target="contact" />

          <Link
            href="/login"
            className="px-4 py-2 rounded-full cursor-pointer bg-lime-400 text-black font-semibold hover:bg-lime-300"
          >
            Começar
          </Link>
          <ClientProfile />
        </nav>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-8"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-lime-400">
          <img
            src="avatar.png"
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Crie um portfólio profissional em minutos
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg max-w-xl">
            SeuFolio gera um site moderno, responsivo e pronto para impressionar
            recrutadores — sem precisar programar.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-300"
            >
              Criar conta grátis
            </Link>
          </div>
        </div>

        {/* STACK BADGES (DEMO) */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-cyan-500">
            <SiReact className="text-cyan-400" />
            React
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-indigo-500">
            <SiPhp className="text-indigo-400" />
            PHP
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-blue-500">
            <SiCss className="text-blue-400" />
            CSS
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-orange-500">
            <SiHtml5 className="text-orange-400" />
            HTML
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-yellow-500">
            <SiJavascript className="text-yellow-400" />
            JavaScript
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section
        id="examples"
        className="w-full max-w-275 px-6 py-20 flex flex-col items-center gap-10"
      >
        <div className="text-center">
          <p className="text-lime-400 font-semibold">Exemplos</p>
          <h2 className="text-2xl font-bold">
            Portfólios criados com a plataforma
          </h2>
        </div>

        {/* MOCK GRID (antes era "Meu trabalho") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          <div className="p-4 bg-neutral-900 rounded-xl flex gap-4">
            <div className="w-30 h-30 bg-neutral-800 rounded-lg" />
            <div>
              <h3 className="font-bold">Dev Portfolio</h3>
              <p className="text-sm text-neutral-400">
                Portfólio moderno com React e animações.
              </p>
            </div>
          </div>

          <div className="p-4 bg-neutral-900 rounded-xl flex gap-4">
            <div className="w-30 h-30 bg-neutral-800 rounded-lg" />
            <div>
              <h3 className="font-bold">Fullstack Dev</h3>
              <p className="text-sm text-neutral-400">
                Layout limpo focado em conversão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section
        id="pricing"
        className="w-full flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24"
      >
        <div className="w-full max-w-3xl rounded-2xl p-6 sm:p-12 flex flex-col items-center gap-6 text-center">
          <span className="text-lime-400 font-semibold text-sm uppercase tracking-wider">
            Comece agora
          </span>

          <h2 className="text-3xl font-bold text-neutral-100">
            Crie seu portfólio em minutos
          </h2>

          <p className="text-neutral-400 max-w-125">
            Adicione seus projetos, links e informações e tenha um portfólio
            profissional pronto para compartilhar.
          </p>

          <div className="flex gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-300 transition"
            >
              Começar grátis
            </Link>

            <Link
              href="/pricing"
              className="text-neutral-400 hover:text-neutral-200 transition"
            >
              Ver planos
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center gap-8"
      >
        <div className="text-center">
          <p className="text-lime-400">Contato</p>
          <h2 className="text-xl font-bold">Quer criar seu portfólio hoje?</h2>
          <p className="text-neutral-500">Entre em contato ou crie agora.</p>
        </div>

        <div className="w-full max-w-100 flex items-center flex-col gap-4">
          <div className="flex flex-col items-center">
            <span className="text-zinc-500 text-[13px] ">Entre em contato</span>
            <span className="font-bold text-zinc-100">
              wendellkauan870@gmail.com
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTE AUXILIAR */
function SocialItem({ icon, label }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
      <div className="flex items-center gap-3 text-neutral-300">
        {icon}
        {label}
      </div>
      <BsArrowUpRight className="text-lime-400" />
    </div>
  );
}
