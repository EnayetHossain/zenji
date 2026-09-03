import React, { useRef, useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }: { readonly children: React.ReactNode }) {
  const smoothRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !smoothRef.current) return;

    const smoother = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      wrapper: smoothRef.current,
      content: contentRef.current,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothRef} className="overflow-hidden w-full">
      <div id="smooth-content" ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
