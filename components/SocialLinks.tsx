export default function SocialLinks() {
  const links = [
    { label: "Instagram", href: "https://instagram.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Email", href: "mailto:you@example.com" },
  ];

  return (
    <div className="flex gap-4">
      {links.map((link) => (
          <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}