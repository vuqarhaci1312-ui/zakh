"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCeepiiNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const overlayMode = pathname === "/";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const applyMobilePadding = () => {
      document.body.style.paddingBottom =
        window.innerWidth < 1024 ? "88px" : "";
    };

    applyMobilePadding();
    window.addEventListener("resize", applyMobilePadding);
    return () => {
      document.body.style.paddingBottom = "";
      window.removeEventListener("resize", applyMobilePadding);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    pathname,
    mobileMenuOpen,
    overlayMode,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
