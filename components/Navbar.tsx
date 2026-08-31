"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isPortfolio = pathname.startsWith("/portfolio");

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const activeIndex = links.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
  );

  useEffect(() => {
    const activeEl = linkRefs.current[activeIndex];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeIndex, pathname]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex gap-6 p-4">
      <div className="relative flex gap-6">
        {links.map((link, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              className={`pb-1 transition-colors ${
                isPortfolio ? "text-black" : "text-white"
              } ${
                isActive
                  ? "font-medium"
                  : isPortfolio
                  ? "hover:text-black/60"
                  : "hover:text-white/60"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <span
          className={`absolute bottom-0 h-0.5 transition-all duration-300 ease-out ${
            isPortfolio ? "bg-black" : "bg-white"
          }`}
          style={{
            left: `${underlineStyle.left}px`,
            width: `${underlineStyle.width}px`,
          }}
        />
      </div>
    </nav>
  );
}