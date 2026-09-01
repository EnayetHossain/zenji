import { FaAngleDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
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
  ]
  const navbarRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!navbarRef.current) return;
    gsap.set(navbarRef.current, { y: '-100%', opacity: 0 });
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.3,
      ease: 'power4.out',
      delay: 0.5,
    });
  });

  return (
    <nav className="mx-auto max-w-[250rem] px-4 flex justify-between items-center py-2" ref={navbarRef}>
      <div className="text-[5rem] font-black">++</div>
      <div className="flex justify-center items-center">
        {
          links.slice(0, 4).map(l => <AnimatedLink key={l.label} to={l.link}> {l.label} </AnimatedLink>
          )}

        <button
          type="button"
          className="cursor-pointer mx-3 text-3xl font-medium flex justify-center items-center relative before:absolute before:h-[0.2rem] before:w-full before:bg-text before:bottom-0 before:scale-x-0 before:origin-left hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out"
        >
          More <FaAngleDown className="ml-2 text-2xl" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
