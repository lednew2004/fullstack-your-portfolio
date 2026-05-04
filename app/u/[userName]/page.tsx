import { getCurrentUser } from "@/app/actions/get-current-user";
import { getPublicProfile } from "@/app/actions/get-public-profile";
import { ScrollButton } from "@/app/components/scroll-button";
import { techConfig } from "@/app/data/projects";
import { techIcons } from "@/app/data/techs";
import Link from "next/link";
import { BiCube } from "react-icons/bi";
import { BsArrowUpRight } from "react-icons/bs";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ClientProfile from "./client-profile";

export default async function Page({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;
  const profileData = await getPublicProfile(userName);

  const projects = profileData.projects;
  const currentUser = await getCurrentUser();

  const socialIconMap = {
    GITHUB: FaGithub,
    INSTAGRAM: FaInstagram,
    LINKEDIN: FaLinkedin,
    TWITTER: FaTwitter,
  };

  const isOwner = currentUser && currentUser.id === profileData.id;

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* NAV */}
      <nav className="w-full max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <BiCube className="text-lime-300 w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-lg sm:text-2xl font-bold font-mono">Your</span>
          <span className="text-lg sm:text-2xl font-bold text-lime-400 underline font-mono">
            Portfolio
          </span>
        </div>

        <nav className="hidden md:flex gap-5 items-center">
          <ScrollButton target="about" />
          <ScrollButton target="projects" />
          <ScrollButton target="contact" />
        </nav>
        <ClientProfile />
      </nav>

      {/* ABOUT */}
      <section
        id="about"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center gap-12"
      >
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-lime-400">
            <img
              src={profileData.urlImage || "/avatar.png"}
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 items-center text-center w-full max-w-xl">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap justify-center gap-1 text-sm sm:text-base text-neutral-400">
                <span>Hello World! Meu nome é</span>
                <span className="text-lime-400 font-semibold">
                  {profileData.name}
                </span>
                <span>e sou</span>
              </div>

              <span className="text-2xl sm:text-4xl font-bold">
                {profileData.role}
              </span>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed px-2">
              {profileData.biography}
            </p>
          </div>
        </div>

        {/* SKILLS */}
        <div className="w-full">
          <span className="text-lg font-bold text-center block mb-4">
            Minhas Skills
          </span>

          <div className="flex flex-wrap justify-center gap-3">
            {profileData.skills?.map((skill) => {
              const config = techConfig[skill.name.toLowerCase()];
              const Icon = config?.icon;
              const color = config?.color || "#888";

              return (
                <div
                  key={skill.id}
                  className="rounded-full flex items-center gap-2 px-3 py-1 bg-neutral-800"
                  style={{ border: `1px solid ${color}` }}
                >
                  <span className="text-neutral-300 font-bold text-sm sm:text-base">
                    {skill.name}
                  </span>

                  {Icon && <Icon className="size-5" style={{ color }} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col gap-10"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-lime-500">Meu trabalho</span>
          <span className="font-bold text-xl text-neutral-100">
            Veja os projetos em destaque
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.slice(0, 8).map((project) => (
            <div
              key={project.id}
              className="w-full rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-neutral-900"
            >
              <div className="w-full sm:w-40 h-48 sm:h-40 rounded-xl overflow-hidden">
                <img
                  src={project.urlImage || "/avatar.png"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="font-bold text-lg sm:text-xl">
                    {project.title}
                  </span>

                  <p className="text-neutral-400 text-sm line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {project.techs?.map((tech) => {
                    const techData = techIcons[tech.name.toLowerCase()];
                    if (!techData) return null;

                    const Icon = techData.icon;

                    return (
                      <Icon
                        key={tech.id}
                        className={`${techData.color} size-4`}
                        title={tech.name}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isOwner && (
        <div className="w-full flex justify-center px-4 sm:px-6 py-16 sm:py-24">
          <div className="w-full max-w-2xl rounded-2xl p-6 sm:p-12 flex flex-col items-center gap-6 text-center">
            <span className="text-lime-400 text-sm uppercase">
              Comece agora
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
              Crie seu portfólio em minutos
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base">
              Adicione seus projetos, links e informações e tenha um portfólio
              profissional pronto para compartilhar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="px-6 py-3 rounded-full bg-lime-400 text-black font-semibold text-center"
              >
                Começar grátis
              </Link>

              <a href="/pricing" className="text-neutral-400 text-center">
                Ver planos
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <section
        id="contact"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center gap-10"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-lime-400 font-semibold">Contato</span>
          <span className="text-xl font-bold text-neutral-100">
            Gostou do meu trabalho?
          </span>
          <span className="text-neutral-500 text-sm">
            Entre em contato ou acompanhe minhas redes sociais!
          </span>
        </div>

        <div className="w-full max-w-md flex flex-col gap-4">
          {profileData.links.map((link) => {
            const Icon = socialIconMap[link.type];
            if (!Icon) return null;

            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5" />
                  <span className="text-neutral-300 text-sm">{link.type}</span>
                </div>

                <a href={link.url}>
                  <BsArrowUpRight className="text-lime-500 size-5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
