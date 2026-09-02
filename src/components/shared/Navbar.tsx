import { FaAngleDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { AnimatedLink } from "./AnimatedLink";

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
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!navbarRef.current) return;
    gsap.set(navbarRef.current, { y: "-100%", opacity: 0 });
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.3,
      ease: "power4.out",
      delay: 0.5,
    });
  });

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

  const lastThree = links.slice(4);

  return (
    <nav className="mx-auto max-w-[250rem] px-4 flex justify-between items-center py-2" ref={navbarRef}>
      <div className="text-[5rem] font-black">++</div>
      <div className="flex justify-center items-center relative">
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
            className={
              "absolute top-full right-0 mt-2 bg-bg border border-text/20 shadow-xl min-w-[16rem] overflow-hidden transition-all duration-300 ease-out z-50 " +
              (open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none")
            }
          >
            {lastThree.map((l) => (
              <AnimatedLink key={l.label} to={l.link} className="block px-4 py-3 hover:bg-text/10 border-b border-text/10">
                {l.label}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
