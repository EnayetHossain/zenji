import { useGSAP } from "@gsap/react";
import { AnimatedLink } from "./shared/AnimatedLink";
import Card from "./shared/Card";
import gsap from "gsap";
import { useRef } from "react";

function Outfits() {
  const outRef = useRef<HTMLDivElement>(null)
  const desRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const linkRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const elements = [outRef, desRef, linkRef, copyRef]
      .map((r) => r.current)
      .filter(Boolean) as HTMLDivElement[];

    gsap.set(elements, { y: 40, opacity: 0 });
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.2,
    });

    const lines = [line1Ref, line2Ref, line3Ref]
      .map((r) => r.current)
      .filter(Boolean) as HTMLSpanElement[];

    gsap.set(lines, { y: 20, opacity: 0 });
    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.4,
    });
  });

  return (
    <section className="mt-8">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-y-8">
        <div className="w-1/2 md:w-auto text-xl font-semibold" ref={outRef}>OUTFIT</div>

        <div className="w-1/2 md:w-auto max-w-lg">
          <div className="text-xl font-medium mb-5" ref={desRef}>WHY</div>
          <p className="text-xl font-medium leading-relaxed">
            <span className="block" ref={line1Ref}>Lorem Ipsum is simply dummy text of the printing</span>
            <span className="block" ref={line2Ref}>and typesetting industry. Lorem Ipsum has been the</span>
            <span className="block" ref={line3Ref}>industry's standard dummy text ever since 1966</span>
          </p>
        </div>

        <div className="w-1/2 md:w-auto mt-8 md:mt-0" ref={linkRef}>
          <AnimatedLink to={"/"} className="text-lg font-medium">SHIPPING & RETURNS</AnimatedLink>
        </div>

        <div className="w-1/2 md:w-auto text-lg font-medium mt-8 md:mt-0 ml-auto md:ml-0 text-right" ref={copyRef}>&copy; 2026</div>
      </div>

      <Card />
    </section>
  )
}

export default Outfits;
