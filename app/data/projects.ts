import { FaJava } from "react-icons/fa";
import {
  SiAngular,
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastify,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRuby,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

export const techConfig: Record<string, { icon: any; color: string }> = {
  // 🔹 Já tinha
  react: {
    icon: SiReact,
    color: "#61DAFB",
  },
  "next.js": {
    icon: SiNextdotjs,
    color: "#ffffff",
  },
  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
  },
  javascript: {
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  "node.js": {
    icon: SiNodedotjs,
    color: "#339933",
  },
  tailwind: {
    icon: SiTailwindcss,
    color: "#38BDF8",
  },

  // 🔥 Novas techs
  html: {
    icon: SiHtml5,
    color: "#E34F26",
  },
  css: {
    icon: SiCss,
    color: "#1572B6",
  },
  docker: {
    icon: SiDocker,
    color: "#2496ED",
  },
  python: {
    icon: SiPython,
    color: "#3776AB",
  },
  java: {
    icon: FaJava,
    color: "#ED8B00",
  },
  postgresql: {
    icon: SiPostgresql,
    color: "#336791",
  },
  prisma: {
    icon: SiPrisma,
    color: "#2D3748",
  },
  c: {
    icon: SiC,
    color: "#A8B9CC",
  },
  "c#": {
    icon: SiSharp,
    color: "#239120",
  },
  "c++": {
    icon: SiCplusplus,
    color: "#00599C",
  },
  ruby: {
    icon: SiRuby,
    color: "#CC342D",
  },
  go: {
    icon: SiGo,
    color: "#00ADD8",
  },
  fastify: {
    icon: SiFastify,
    color: "#000000",
  },
  "vue.js": {
    icon: SiVuedotjs,
    color: "#4FC08D",
  },
  angular: {
    icon: SiAngular,
    color: "#DD0031",
  },
  php: {
    icon: SiPhp,
    color: "#777BB4",
  },

  // ⚠️ Não existe ícone oficial no simple-icons
  drizzle: {
    icon: SiJavascript, // fallback temporário
    color: "#C5F74F", // cor aproximada
  },
};
