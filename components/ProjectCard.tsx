import Image from "next/image";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  links: ProjectLink[];
};

export default function ProjectCard({ title, description, image, links }: ProjectCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">{description}</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}