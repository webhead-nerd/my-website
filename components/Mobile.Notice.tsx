"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const noticeStyles = {
  home: {
    container: "bg-green-950/60 border-green-700/30",
    text: "text-white",
    button: "bg-white text-green-950 hover:bg-gray-100",
  },
  blog: {
    container: "bg-[#8a7259]/80 border-[#a6926f]/40",
    text: "text-white",
    button: "bg-white text-[#8a7259] hover:bg-gray-100",
  },
  portfolio: {
    container: "bg-white/85 border-black/10",
    text: "text-black",
    button: "bg-black text-white hover:bg-gray-800",
  },
} as const;

function getSection(pathname: string): keyof typeof noticeStyles {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  return "home";
}

export default function MobileNotice() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const section = getSection(pathname);
  const styles = noticeStyles[section];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const dismissed = sessionStorage.getItem(`mobileNoticeDismissed:${pathname}`);
    if (isMobile && !dismissed) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [pathname]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(`mobileNoticeDismissed:${pathname}`, "true");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 z-[60] md:hidden">
      <div
        className={`backdrop-blur-md border rounded-xl shadow-lg px-5 py-5 flex items-center justify-between gap-4 ${styles.container}`}
      >
        <p className={`text-sm font-serif text-left ${styles.text}`}>
          <span className="block text-base font-bold mb-1">Hey there!</span>
          Just letting you know that this website is better experienced on
          desktop, the visuals will be weird on other devices.
        </p>
        <button
          onClick={dismiss}
          className={`shrink-0 text-sm font-medium rounded-full px-4 py-2 transition ${styles.button}`}
        >
          Okay
        </button>
      </div>
    </div>
  );
}