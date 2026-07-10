"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCeepiiNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  const overlayMode = isHome && !isScrolled;
  const fixedMode = isHome && isScrolled;

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
    fixedMode,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
