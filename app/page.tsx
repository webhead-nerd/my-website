import Image from "next/image";
import { FaInstagram, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const socials = [
  { icon: FaYoutube, href: "https://youtube.com/@yourchannel", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com/yourusername", label: "Instagram" },
  { icon: SiGmail, href: "mailto:vishal.gunra@gmail.com", label: "Email" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
];

export default function Home() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mobile background */}
      <Image
        src="/images/mobile.bg.webp"
        alt=""
        fill
        priority
        className="object-cover md:hidden"
      />

      {/* Desktop background */}
      <Image
        src="/images/home.bg.webp"
        alt=""
        fill
        priority
        className="object-cover hidden md:block"
      />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-white/40 backdrop-blur-sm" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          Hi, <span className="text-green-700">I&apos;m Vishal</span>
        </h1>
        <p className="text-base md:text-lg font-sans mb-6">
          I&apos;m a Business Analyst, I like art, music and a lot of other
          nerdy things.
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:opacity-80 transition"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}