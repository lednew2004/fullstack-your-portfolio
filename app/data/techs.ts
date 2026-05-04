import { IconType } from "react-icons";
import {
  SiAngular,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

type TechData = {
  icon: IconType;
  color: string;
};

export const techIcons: Record<string, TechData> = {
  javascript: { icon: SiJavascript, color: "text-yellow-500" },
  css: { icon: SiCss, color: "text-blue-500" },
  html: { icon: SiHtml5, color: "text-orange-500" },
  php: { icon: SiPhp, color: "text-indigo-500" },

  react: { icon: SiReact, color: "text-cyan-400" },
  nextjs: { icon: SiNextdotjs, color: "text-white" },
  vuejs: { icon: SiVuedotjs, color: "text-green-500" },
  tailwind: { icon: SiTailwindcss, color: "text-sky-400" },
  "node.js": { icon: SiNodedotjs, color: "text-green-500" },
  mongodb: { icon: SiMongodb, color: "text-green-600" },
  typescript: { icon: SiTypescript, color: "text-blue-600" },
  angular: { icon: SiAngular, color: "text-red-600" },
  postgresql: { icon: SiPostgresql, color: "text-blue-500" },
};
