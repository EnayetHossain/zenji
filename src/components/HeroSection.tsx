import { AnimationDuration } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLoading } from "@/hooks/useLoading";

function HeroSection() {
  const path0 = useRef<SVGPathElement>(null);
  const path1 = useRef<SVGPathElement>(null);
  const path2 = useRef<SVGPathElement>(null);
  const path3 = useRef<SVGPathElement>(null);
  const path4 = useRef<SVGPathElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { canAnimate } = useLoading();

  useGSAP(() => {
    const elements = [path0, path4, path1, path3, path2]
      .map((r) => r.current)
      .filter(Boolean) as Array<HTMLDivElement | SVGPathElement>;

    if (!canAnimate) {
      gsap.set(elements, { y: "110%" });
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      }
      return;
    }

    gsap.to(elements, {
      y: 0,
      duration: AnimationDuration,
      ease: "power4.out",
      stagger: 0.2,
    });

    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: AnimationDuration,
        ease: "power2.inOut",
        delay: 0.3,
      });
    }
  }, [canAnimate]);

  return (
    <header className="flex flex-col items-center">
      <svg width="100%" height="auto" viewBox="20 140 1380 370" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', maxWidth: '100%' }}>
        <g id="svgGroup" stroke-linecap="round" fill-rule="nonzero" fill="#ede4dd" stroke="#ede4dd" stroke-width="0.5" vector-effect="non-scaling-stroke">
          <g id="line-0">
            <path ref={path0} id="char-0-0" d="M269 496L25 496L25 438.500L182.500 208L25.500 208L25.500 146L268.500 146L268.500 203.500L110 434L269 434L269 496Z" />
            <path ref={path1} id="char-0-1" d="M575.500 496L341 496L341 146L575.500 146L575.500 206.500L416 206.500L416 289L560.500 289L560.500 347L416 347L416 435.500L575.500 435.500L575.500 496Z" />
            <path ref={path2} id="char-0-2" d="M723.500 496L648.500 496L648.500 146L723.500 146L877 376L877 376L877 146L952 146L952 496L877 496L723.500 267L723.500 267L723.500 496Z" />
            <path ref={path3} id="char-0-3" d="M1131 502L1131 502Q1096 502 1069.500 488.750Q1043 475.500 1028.250 449.500Q1013.500 423.500 1013.500 386L1013.500 386L1088 386Q1088 401.500 1092.750 412.500Q1097.500 423.500 1106.500 429.250Q1115.500 435 1129 435L1129 435Q1142 435 1150.500 429.750Q1159 424.500 1163 414.500Q1167 404.500 1167 390.500L1167 390.500L1167 146L1242 146L1242 390.500Q1242 445 1211.750 473.500Q1181.500 502 1131 502Z" />
            <path ref={path4} id="char-0-4" d="M1397.500 496L1322.500 496L1322.500 146L1397.500 146L1397.500 496Z" />
          </g>
        </g>
      </svg>
      <div ref={lineRef} className="w-full h-4 bg-text mt-4" />
    </header>
  );
}

export default HeroSection;
