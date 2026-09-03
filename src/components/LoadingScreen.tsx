import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useLoading } from "@/hooks/useLoading";
import { cn } from "@/lib/utils";

function LoadingScreen() {
  const {
    progress,
    isLoaded,
    isLoading,
    loadedCount,
    totalCount,
    triggerContentAnimation,
    finishLoading,
  } = useLoading();

  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLDivElement>(null);
  const exitTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    if (isLoading && !isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, isLoaded]);

  useEffect(() => {
    if (!isLoaded || exitTriggeredRef.current || !containerRef.current) {
      return;
    }

    exitTriggeredRef.current = true;

    const exitDuration = 1.2;
    const triggerTime = exitDuration * 0.8;

    const tl = gsap.timeline({
      delay: 0.25,
      onStart: () => {
        document.body.style.overflow = "";
      },
      onComplete: () => {
        document.body.style.overflow = "";
        finishLoading();
      },
    });

    tl.to(
      containerRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: exitDuration,
        ease: "power4.inOut",
      },
      0
    );

    if (percentTextRef.current) {
      tl.to(
        percentTextRef.current,
        {
          y: -40,
          opacity: 0.4,
          duration: exitDuration * 0.6,
          ease: "power2.in",
        },
        0
      );
    }

    tl.call(
      () => {
        document.body.style.overflow = "";
        triggerContentAnimation();
      },
      [],
      triggerTime
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [isLoaded, finishLoading, triggerContentAnimation]);

  if (!isLoading || typeof document === "undefined") {
    return null;
  }

  const getStatusLabel = (): string => {
    if (progress < 40) return "INITIALIZING ARCHIVE...";
    if (progress < 75) return "DECODING HIGH-RES ASSETS...";
    if (progress < 100) return "COMPILING STYLES & FONTS...";
    return "INITIALIZATION COMPLETE";
  };

  const content = (
    <div
      ref={containerRef}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col justify-between bg-text text-bg p-8 md:p-14 select-none",
        isLoaded ? "pointer-events-none" : "pointer-events-auto"
      )}
      style={{
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 9999,
      }}
    >
      <div className="flex justify-between items-center text-sm md:text-base font-semibold tracking-widest uppercase border-b border-bg/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-bg animate-pulse" />
          <span>ZENJI // ARCHIVE</span>
        </div>
        <div className="hidden sm:block text-accent-gray">FW26 COLLECTION</div>
        <div className="text-right">SYS.STATUS: {progress}%</div>
      </div>

      <div className="flex flex-col items-center justify-center my-auto w-full max-w-5xl mx-auto text-center px-4">
        <div
          ref={percentTextRef}
          className="font-black text-[clamp(5rem,18vw,16rem)] leading-none tracking-tighter tabular-nums text-bg"
        >
          {progress}
          <span className="text-3xl md:text-6xl font-light text-accent-gray ml-2">
            %
          </span>
        </div>

        <div className="w-full max-w-xl h-1 bg-bg/20 mt-6 md:mt-10 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-bg transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-xs md:text-sm tracking-widest text-accent-gray uppercase font-medium">
          {getStatusLabel()}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs md:text-sm tracking-wider uppercase border-t border-bg/20 pt-4 text-accent-gray">
        <div>
          ASSETS: <span className="text-bg font-semibold">{loadedCount}</span> / {totalCount}
        </div>
        <div className="hidden md:block">BOTTOM-UP REVEAL PROTOCOL</div>
        <div className="text-right text-bg font-semibold">&copy; 2026 ZENJI</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export default LoadingScreen;
