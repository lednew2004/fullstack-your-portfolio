"use server";

import { getUserIdOrRedirect } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { uploadImage } from "../lib/upload-image"; // sua função do cloudinary

export async function createProject(formData: FormData) {
  try {
    const userId = await getUserIdOrRedirect();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        isVip: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // 1. contar projetos do usuário
    const projectsCount = await prisma.projects.count({
      where: { userId },
    });

    // 2. regra de limite
    if (!user.isVip && projectsCount >= 3) {
      throw new Error("Limite de projetos atingido no plano trial");
    }

    const projectName = formData.get("projectName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectUrl = formData.get("projectUrl") as string;
    const file = formData.get("file") as File;
    const techs = JSON.parse(formData.get("techs") as string);

    // 1. cria projeto
    const project = await prisma.projects.create({
      data: {
        title: projectName,
        description: projectDescription,
        urlProject: projectUrl,
        techs: {
          connect: techs.map((name: string) => ({
            name,
          })),
        },
        userId,
      },
    });

    // 2. upload imagem (se existir)
    if (file && file.size > 0) {
      const result = await uploadImage(file);

      // 3. salva url no projeto
      await prisma.projects.update({
        where: { id: project.id },
        data: {
          urlImage: result.secure_url,
        },
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
