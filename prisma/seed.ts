import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const techs = [
    "html",
    "css",
    "javascript",
    "typescript",
    "php",
    "python",
    "java",
    "c#",
    "c++",
    "c",
    "ruby",
    "go",
    "node.js",
    "react",
    "angular",
    "vue.js",
    "next.js",
    "postgresql",
    "drizzle",
    "prisma",
    "docker",
    "tailwind",
    "fastify",
  ];

  for (const name of techs) {
    const tech = await prisma.techs.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    console.log(`Tech criada: ${tech.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
