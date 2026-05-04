"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { useStripe } from "../hooks/use-stripe";

export function PricingPlans({ profileId }: { profileId: string }) {
  const { createStripeCheckout } = useStripe();
  const router = useRouter();

  function handleCheckout(isSubscription: boolean) {
    if (!profileId || profileId.trim() === "") {
      router.push("/register");
      return;
    }

    createStripeCheckout({
      metadata: { profileId },
      isSubscription,
    });
  }

  return (
    <div className="w-full py-25 flex flex-col items-center justify-center">
      <div className="w-250 mb-10">
        <Link href="/" className="flex items-center mb-4">
          <div className="flex items-center text-neutral-100 hover:text-neutral-300 gap-2">
            <BsArrowLeft size={18} />
            <span>Voltar</span>
          </div>
        </Link>

        <h1 className="text-3xl font-bold">Escolha seu plano</h1>
        <p className="text-neutral-400">
          Crie e compartilhe seu portfólio profissional
        </p>
      </div>

      <div className="w-250 flex gap-12.5">
        {/* GRATUITO */}
        <div className="w-75 p-6 border border-neutral-900 rounded-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Grátis</h2>
            <p className="text-neutral-400 mb-4">Para começar</p>

            <p className="text-3xl font-bold mb-6">
              <span className="text-neutral-200">R$0</span>
            </p>

            <ul className="text-sm text-neutral-300 space-y-2">
              <li>✔ Até 3 projetos</li>
              <li>✔ Até 2 links</li>
              <li>✔ Perfil público</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-6 bg-zinc-950 text-center hover:bg-neutral-700 text-white py-2 rounded"
          >
            Começar grátis
          </Link>
        </div>

        {/* MENSAL */}
        <div className="w-75 p-6 border border-lime-300 rounded-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Mensal</h2>
            <p className="text-neutral-400 mb-4">Acesso completo</p>

            <p className="text-3xl font-bold mb-6">
              <span className="text-lime-400">R$9,90</span>
              <span className="text-sm">/mês</span>
            </p>

            <ul className="text-sm text-neutral-300 space-y-2">
              <li>✔ Projetos ilimitados</li>
              <li>✔ Edição completa</li>
              <li>✔ Upload de projetos</li>
              <li>✔ Link público</li>
              <li>✔ Suporte</li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout(true)}
            className="mt-6 bg-lime-400 cursor-pointer hover:bg-lime-300 text-black py-2 rounded"
          >
            Assinar
          </button>
        </div>

        {/* ANUAL */}
        <div className="w-75 p-6 border border-lime-400 rounded-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Anual</h2>
            <p className="text-neutral-400 mb-4">Melhor custo-benefício</p>

            <p className="text-3xl font-bold mb-6">
              <span className="text-lime-400">R$99,90</span>
              <span className="text-sm">/ano</span>
            </p>

            <ul className="text-sm text-neutral-300 space-y-2">
              <li>✔ Tudo do plano mensal</li>
              <li>✔ Economia anual</li>
              <li>✔ Prioridade no suporte</li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout(false)}
            className="mt-6 bg-lime-400 cursor-pointer hover:bg-lime-300 text-black py-2 rounded"
          >
            Assinar
          </button>
        </div>
      </div>
    </div>
  );
}
