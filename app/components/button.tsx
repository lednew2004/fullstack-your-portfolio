import { cn } from "@/app/lib/utils";

export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "p-3 text-white rounded-xl cursor-pointer font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
        variant === "primary" && "bg-purple-800",
        variant === "secondary" && "bg-zinc-900",
        variant === "ghost" && "bg-zinc-950",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
