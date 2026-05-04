"use client";

export function CopyLinkButton({ username }: { username: string }) {
  function copyLink() {
    const url = `${window.location.origin}/u/${username}`;
    navigator.clipboard.writeText(url);
    alert("Link copiado");
  }

  return (
    <button
      className="w-77.25 h-12 p-3 rounded-xl bg-lime-400 hover:bg-lime-300 cursor-pointer"
      onClick={copyLink}
    >
      <span className="text-zinc-900 font-bold">
        Copie seu link de portfolio
      </span>
    </button>
  );
}
