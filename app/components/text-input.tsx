import { cn } from "@/app/lib/utils";

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={cn(
        `w-full p-3 bg-zinc-900 text-white placeholder:text-zinc-400 rounded-xl
         border border-transparent hover:border-zinc-800 hover:text-zinc-300 active:border-zinc-400`,
        props.className,
      )}
    />
  );
}
