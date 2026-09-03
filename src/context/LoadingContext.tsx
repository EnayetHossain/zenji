import React, { useEffect, useRef, useState, useCallback } from "react";
import { LoadingContext } from "./loadingTypes";

function preloadImage(url: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = url;

    img
      .decode()
      .then(() => {
        resolve();
      })
      .catch(() => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
  });
}

async function discoverAssetUrls(): Promise<string[]> {
  const urlSet = new Set<string>();

  document.querySelectorAll("img").forEach((img) => {
    if (img.src) {
      urlSet.add(img.src);
    }
  });

  try {
    const response = await fetch("/data/products.json");
    if (response.ok) {
      const products: Array<{ url?: string; url2?: string }> = await response.json();
      products.forEach((product) => {
        if (product.url) urlSet.add(product.url);
        if (product.url2) urlSet.add(product.url2);
      });
    }
  } catch (error) {
    console.warn("Could not dynamically load products.json for preloading", error);
  }

  return Array.from(urlSet);
}

export function LoadingProvider({ children }: { readonly children: React.ReactNode }) {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canAnimate, setCanAnimate] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(1);

  const realProgressRef = useRef<number>(0);
  const loadedCountRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let currentDisplay = 0;

    const tick = () => {
      const target = realProgressRef.current;
      if (currentDisplay < target) {
        const delta = Math.max(1, Math.ceil((target - currentDisplay) * 0.12));
        currentDisplay = Math.min(target, currentDisplay + delta);
        setProgress(currentDisplay);
        setLoadedCount(loadedCountRef.current);
      }

      if (currentDisplay >= 100 && target >= 100) {
        setIsLoaded(true);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const runPreload = async () => {
      const imageUrls = await discoverAssetUrls();
      if (isCancelled) return;

      const totalTasks = Math.max(1, imageUrls.length + 1);
      setTotalCount(totalTasks);

      const markTaskComplete = () => {
        if (isCancelled) return;
        loadedCountRef.current += 1;
        const calculated = Math.min(
          100,
          Math.round((loadedCountRef.current / totalTasks) * 100)
        );
        realProgressRef.current = calculated;
      };

      const fontPromise = ("fonts" in document ? document.fonts.ready : Promise.resolve())
        .catch(() => { })
        .finally(() => markTaskComplete());

      const imagePromises = imageUrls.map((url) =>
        preloadImage(url).finally(() => markTaskComplete())
      );

      await Promise.all([fontPromise, ...imagePromises]);

      if (!isCancelled) {
        realProgressRef.current = 100;
        loadedCountRef.current = totalTasks;
      }
    };

    runPreload();

    return () => {
      isCancelled = true;
    };
  }, []);

  const triggerContentAnimation = useCallback(() => {
    setCanAnimate(true);
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        progress,
        isLoaded,
        isLoading,
        canAnimate,
        loadedCount,
        totalCount,
        triggerContentAnimation,
        finishLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
