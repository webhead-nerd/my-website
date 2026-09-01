"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

const gradientLight = "#eaf2fb";
const gradientMid = "#a9c6e8";

const projects = [
  { slug: "project-one", title: "Project One", thumbnail: "/images/projects/1.2.webp" },
  { slug: "project-two", title: "Project Two", thumbnail: "/images/projects/2.1.webp" },
  { slug: "project-three", title: "Project Three", thumbnail: "/images/projects/3.1.webp", aspectRatio: "1636/1080" },
];

function ProjectCard({
  project,
  offsetClass,
}: {
  project: (typeof projects)[number];
  offsetClass: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const lastTap = useRef(0);

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setRevealed((prev) => !prev);
    }
    lastTap.current = now;
  };

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group relative block w-full rounded-lg overflow-hidden ${
        project.aspectRatio ? "" : "h-52"
      } ${offsetClass}`}
      style={project.aspectRatio ? { aspectRatio: project.aspectRatio } : undefined}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className="object-cover"
      />
      <div
        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          revealed ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100`}
      >
        <span className="text-white font-serif text-xl text-center px-4">
          {project.title}
        </span>
      </div>
    </Link>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[18px] h-[18px] md:w-[clamp(24px,4.57vw,62px)] md:h-[clamp(24px,4.57vw,62px)]"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[18px] h-[18px] md:w-[clamp(24px,4.57vw,62px)] md:h-[clamp(24px,4.57vw,62px)]"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.762-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.566 21.797 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <div className="bg-white">
      {/* Hero — background image at natural aspect ratio (no cropping), with overlaid View Resume button */}
      <section className="relative w-full">
        <img
          src="/images/p.header.webp"
          alt="Vishal Gunra — Hi, I'm Vishal"
          className="w-full h-auto block"
        />

        {/* Mobile-only View Resume button — smaller, positioned slightly higher */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden absolute font-serif text-black border border-black rounded-full text-[9px] px-2.5 py-1"
          style={{ top: "51%", right: "6%" }}
        >
          View Resume
        </a>

        {/* Desktop View Resume button — unchanged from before */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block absolute font-serif text-black border border-black rounded-full"
          style={{
            top: "55%",
            right: "6%",
            fontSize: "clamp(11px, 1.32vw, 18px)",
            paddingLeft: "clamp(10px, 1.76vw, 24px)",
            paddingRight: "clamp(10px, 1.76vw, 24px)",
            paddingTop: "clamp(5px, 0.88vw, 12px)",
            paddingBottom: "clamp(5px, 0.88vw, 12px)",
          }}
        >
          View Resume
        </a>
      </section>

      {/* My Projects — staggered thumbnail layout */}
      <section
        className="w-full py-16 px-6 md:px-16"
        style={{ backgroundColor: gradientLight }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif mb-10">My Projects</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <ProjectCard project={projects[0]} offsetClass="sm:mt-0" />
            <ProjectCard project={projects[1]} offsetClass="sm:mt-6" />
            <ProjectCard project={projects[2]} offsetClass="sm:mt-14" />
          </div>
        </div>
      </section>

      {/* Other Works — matches footer's background tone */}
      <section
        className="w-full py-16 px-6 md:px-16"
        style={{ backgroundColor: gradientLight }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif mb-8">Other Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="order-1 sm:order-1 bg-white rounded-lg p-5 aspect-auto sm:aspect-[3/2] flex flex-col justify-center">
              <h3 className="font-serif text-xl font-bold mb-2">Commerce Club</h3>
              <p className="text-[15.4px]">
                Served as Vice President (Second Year) and President (Final Year) of the college Commerce Club, leading the planning and execution of academic and co-curricular events and coordinating with faculty and student teams.
              </p>
            </div>
            <div className="order-2 sm:order-2 relative w-full aspect-[3/2] rounded-lg overflow-hidden">
              <Image src="/images/c1.webp" alt="" fill className="object-cover" />
            </div>
            <div className="order-3 sm:order-3 relative w-full aspect-[3/2] rounded-lg overflow-hidden">
              <Image src="/images/c2.webp" alt="" fill className="object-cover" />
            </div>
            {/* Social Media Management text card — moved above sm1/sm2 on mobile only */}
            <div className="order-4 sm:order-6 bg-white rounded-lg p-5 aspect-auto sm:aspect-square flex flex-col justify-center">
              <h3 className="font-serif text-xl font-bold mb-2">Social Media Management</h3>
              <p className="text-[15.4px]">
                Managed the social media campaign for my department's annual fest "Euphoria" garnering thousands of views and promotional content. I also have a YouTube channel managed completely by myself, proof of my editing, and content writing skills
              </p>
            </div>
            <div className="order-5 sm:order-4 relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/images/sm1.webp" alt="" fill className="object-cover" />
            </div>
            <div className="order-6 sm:order-5 relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/images/sm2.webp" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer — background image with overlaid Email/LinkedIn/GitHub */}
      <section className="relative w-full">
        <img
          src="/images/Footer.webp"
          alt="Work with me — Let's connect"
          className="w-full h-auto block"
        />
        <div
          className="absolute font-serif text-black text-left"
          style={{ top: "69%", left: "68.7%" }}
        >
          <p style={{ fontSize: "clamp(11px, 2.05vw, 28px)" }} className="mb-1">
            Email me:
          </p>
          <a
            href="mailto:vishal.gunra@gmail.com"
            style={{ fontSize: "clamp(11px, 2.05vw, 28px)" }}
            className="mb-4 inline-block underline"
          >
            vishal.gunra@gmail.com
          </a>
          <div className="flex gap-4 -mt-2 md:mt-4 justify-start">
            <a
              href="https://www.linkedin.com/in/vishalgunra/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://github.com/webhead-nerd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}