import { FaAngleDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { AnimatedLink } from "./AnimatedLink";
import { AnimationDuration } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "../ui/button";

function Navbar() {
  const links: Array<Record<string, string>> = [
    { label: "Drop", link: "/drop" },
    { label: "Collection", link: "/collection" },
    { label: "Lookbook", link: "/lookbook" },
    { label: "Our Story", link: "/our-stroy" },
    { label: "Collaboration", link: "/collaboration" },
    { label: "Review", link: "/review" },
    { label: "FAQ", link: "/faq" },
  ];

  const navbarRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { canAnimate } = useLoading();

  const lastThree = links.slice(4);

  useGSAP(() => {
    if (!navbarRef.current) return;
    if (!canAnimate) {
      gsap.set(navbarRef.current, { y: "-100%", opacity: 0 });
      return;
    }
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: AnimationDuration,
      ease: "power4.out",
      delay: 0.1,
    });
  }, [canAnimate]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.set(mobileMenuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        pointerEvents: "auto",
      });
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: "power3.inOut",
      });

      if (mobileLinksRef.current) {
        const linksEl = mobileLinksRef.current.querySelectorAll("a");
        gsap.set(linksEl, { y: 25, opacity: 0 });
        gsap.to(linksEl, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2,
        });
      }
    } else {
      if (mobileLinksRef.current) {
        const linksEl = mobileLinksRef.current.querySelectorAll("a");
        gsap.to(linksEl, {
          y: -20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.pointerEvents = "none";
          }
        },
      });
    }
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const mobileMenuPortal = typeof document !== "undefined"
    ? createPortal(
      <div
        ref={mobileMenuRef}
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-100 bg-bg text-text flex flex-col justify-start p-6 sm:p-10 select-none",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div className="flex justify-between items-center w-full border-b border-text/20">
          <div className="text-[4.5rem] font-black">++</div>
          <Button
            variant={"ghost"}
            onClick={() => setMobileOpen(false)}
            className="text-2xl sm:text-3xl font-semibold cursor-pointer px-4 py-2 border border-text/30 hover:border-text transition-colors uppercase tracking-wider"
          >
            Close
          </Button>
        </div>

        <div
          ref={mobileLinksRef}
          className="flex flex-col gap-8 my-20"
        >
          {links.map((l) => (
            <AnimatedLink
              key={l.label}
              to={l.link}
              className="text-6xl sm:text-5xl font-black tracking-tight text-text transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </AnimatedLink>
          ))}
        </div>

        <div className="flex justify-between items-center w-full text-sm uppercase tracking-widest text-text border-t border-text/20 pt-4">
          <div>ZENJI // ARCHIVE 2026</div>
          <div>ALL RIGHTS RESERVED</div>
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <nav
        className="mx-auto max-w-[250rem] px-4 flex justify-between items-center py-2 relative z-50"
        ref={navbarRef}
      >
        <div className="text-[5rem] font-black">++</div>

        {/* Desktop Links */}
        <div className="hidden md:flex justify-center items-center relative">
          {links.slice(0, 4).map((l) => (
            <AnimatedLink key={l.label} to={l.link}>
              {l.label}
            </AnimatedLink>
          ))}
          <div ref={dropdownRef} className="relative mx-3">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="cursor-pointer text-3xl font-medium flex justify-center items-center relative before:absolute before:h-[0.2rem] before:w-full before:bg-text before:bottom-0 before:scale-x-0 before:origin-left hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out"
            >
              More <FaAngleDown className="ml-2 text-2xl" />
            </button>
            <div
              className={cn(
                "absolute top-full right-0 mt-2 bg-text shadow-xl min-w-[16rem] overflow-hidden transition-all duration-300 ease-out z-50",
                open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              )}
            >
              {lastThree.map((l) => (
                <AnimatedLink
                  key={l.label}
                  to={l.link}
                  className="block py-3 hover:bg-bg/10 text-bg before:bg-bg"
                >
                  {l.label}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex md:hidden text-3xl font-semibold cursor-pointer py-1 px-3 border border-text/20 hover:border-text transition-colors"
        >
          Menu
        </button>
      </nav>

      {mobileMenuPortal}
    </>
  );
}

export default Navbar;
