import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useLoading } from "@/hooks/useLoading";

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export default function CustomCursor() {
  const { canAnimate } = useLoading();
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const currentPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      const card = target?.closest(".card-anim");
      setIsHovering(Boolean(card));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.18);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isTouchDevice]);

  if (isTouchDevice || typeof document === "undefined") {
    return null;
  }

  const showCursor = isVisible && canAnimate;

  const cursorElement = (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "fixed top-0 left-0 pointer-events-none select-none z-9990 flex items-center justify-center rounded-full text-center will-change-transform",
        "bg-accent-red text-text shadow-lg shadow-red-600/30",
        "transition-[width,height,opacity,background-color] duration-300 ease-out",
        showCursor ? "opacity-100" : "opacity-0",
        isHovering ? "w-30 h-30" : "w-3.5 h-3.5"
      )}
      style={{
        zIndex: 9990,
      }}
    >
      <span
        className={cn(
          "font-semibold text-md uppercase tracking-wider whitespace-nowrap transition-all duration-200 select-none",
          isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
        )}
      >
        View More
      </span>
    </div>
  );

  return createPortal(cursorElement, document.body);
}
