import { useEffect } from "react";
import gsap from "gsap";

export function useCardHover() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const cards = gsap.utils.toArray(".card-anim:not([data-hover-attached])") as HTMLElement[];
      cards.forEach((card) => {
        const img = card.querySelector(".clip-img") as HTMLElement | null;
        if (!img) return;
        card.setAttribute("data-hover-attached", "true");

        const enter = () => {
          gsap.to(img, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" });
          gsap.to(img, {
            scale: 1.05,
            filter: "brightness(1.4) saturate(1.4)",
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => gsap.to(img, {
              scale: 1,
              filter: "brightness(1) saturate(1)",
              duration: 0.3,
              ease: "power2.inOut",
            }),
          });
        };
        const leave = () => gsap.to(img, { clipPath: "inset(0 100% 0 0)", duration: 0.6, ease: "power2.inOut" });

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
}
