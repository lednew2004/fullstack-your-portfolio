import { getProfile } from "@/app/actions/get-profile";
import { CopyLinkButton } from "@/app/components/copy-link-button";
import Portal from "@/app/components/portal";
import { isTrialActive } from "@/app/lib/access";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import AddSkills from "./add-skills";
import EditUserCard from "./edit-profile";
import EditSocialLinks from "./edit-social-links";
import NewProject from "./new-project";

export default async function profilePage() {
  const profileData = await getProfile();
  const projects = profileData.projects;

  const isVip = profileData.isVip === true;
  const isTrial = isTrialActive(profileData);
  const hasAccess = isVip || isTrial;

  const projectsCount = projects?.length ?? 0;

  const canCreateProject = isVip || projectsCount < 3;

  if (!hasAccess) {
    redirect("/profile/upgrade");
  }

  const socialIconMap = {
    GITHUB: FaGithub,
    INSTAGRAM: FaInstagram,
    LINKEDIN: FaLinkedin,
    TWITTER: FaTwitter,
  };

  const icons = [FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaPlus];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row px-4 lg:px-20 py-10 lg:py-15">
      {/* TRIAL BANNER */}
      {!isVip && isTrial && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-zinc-900 text-sm">
          <span>Você está usando a versão trial.</span>
          <Link href={`/profile/upgrade`}>
            <button className="text-green-500 font-bold cursor-pointer">
              Faça o upgrade agora
            </button>
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-30 w-full">
        {/* SIDEBAR */}
        <div className="w-full lg:w-97.25 h-auto lg:h-full rounded-4xl p-6 lg:p-10 bg-neutral-900 flex items-center flex-col gap-5.25">
          <div className="w-32 h-32 lg:w-50 lg:h-50">
            <img
              src={profileData?.urlImage || "/avatar.png"}
              alt="Profile image"
              className="rounded-full object-cover w-full h-full"
            />
          </div>

          <div className="w-full lg:w-77.25 flex flex-col gap-2">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="flex gap-2 items-center">
                <span className="text-2xl lg:text-3xl font-bold text-neutral-50">
                  {profileData.name}
                </span>
                <EditUserCard profileData={profileData} />
              </div>

              <span className="text-neutral-400 text-center lg:text-left">
                {profileData.role || "Fale sobre você"}
              </span>
            </div>

            <div className="w-full border-b border-neutral-700" />

            {/* LINKS */}
            <div className="w-full flex flex-col gap-2 items-center lg:items-start">
              <span className="text-[12px]">LINKS</span>

              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                {profileData?.links?.map((link) => {
                  const Icon = socialIconMap[link.type];
                  if (!Icon) return null;

                  return (
                    <div
                      key={link.id}
                      className="w-12 h-12 p-3 bg-neutral-700 rounded-xl hover:bg-neutral-600 cursor-pointer"
                    >
                      <Link href={link.url} target="_blank">
                        <Icon className="text-[24px]" />
                      </Link>
                    </div>
                  );
                })}

                {!profileData &&
                  icons.map((Icon, index) => (
                    <button
                      key={index}
                      className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
                    >
                      <Icon />
                    </button>
                  ))}

                <EditSocialLinks />
              </div>
            </div>

            <div className="w-full border-b border-neutral-700" />

            <CopyLinkButton username={profileData.username} />
            <AddSkills userId={profileData.id} />
          </div>
        </div>

        {/* PROJETOS */}
        <div className="w-full lg:w-174 flex flex-col gap-8">
          <span className="text-2xl font-bold">Projetos</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="w-full flex p-4 gap-4 bg-zinc-900 hover:border border-dashed border-lime-400 cursor-pointer rounded-[20px]"
              >
                {/* IMAGE */}
                <div className="w-28 sm:w-32 aspect-4/3 overflow-hidden rounded-md shrink-0 bg-neutral-800">
                  <img
                    src={project.urlImage || "/avatar.png"}
                    alt="project"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <span className="text-lime-300 text-xs sm:text-sm">
                    Project
                  </span>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-neutral-50 text-base sm:text-lg truncate">
                      {project.title}
                    </span>

                    <span className="text-neutral-500 text-sm line-clamp-3">
                      {project.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <NewProject canCreateProject={canCreateProject} />
          <Portal />
        </div>
      </div>
    </div>
  );
}
