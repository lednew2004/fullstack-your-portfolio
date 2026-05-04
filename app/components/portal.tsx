import { BiTrendingUp } from "react-icons/bi";
import { getCurrentUser } from "../actions/get-current-user";
import Portalbutton from "./portal-button";

export default async function Portal() {
  const session = await getCurrentUser();

  return (
    <div className="w-min whitespace-nowrap flex items-center gap-5 bg-zinc-900 border border-zinc-950 px-8 py-3 rounded-xl shadow-lg">
      <span className="font-bold text-lime-400">
        {session?.isVip ? "Plano Pro ativo" : `Trial • 3 dias restantes`}
      </span>
      <div className="flex items-center gap-2 text-green-400">
        <BiTrendingUp />
      </div>
      <div className="flex items-center gap-2">
        {session?.isVip && <Portalbutton />}
        <form action={`/u/${session?.username}`}>
          <button className="cursor-pointer">Sair</button>
        </form>
      </div>
    </div>
  );
}
