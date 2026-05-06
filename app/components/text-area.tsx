import { cn } from "@/app/lib/utils";

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(
        `w-wfull p-3 bg-zinc-900 text-white placeholder:text-zinc-500 rounded-xl
        border border-transparent hover:border-zinc-900 hover:text-zinc-200 active:border-zinc-300`,
        props.className,
      )}
    />
  );
}
