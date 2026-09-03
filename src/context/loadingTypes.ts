import { createContext } from "react";

export interface LoadingContextType {
  /**
   * The smoothly animated percentage (0 - 100) reflecting real asset load progress.
   */
  readonly progress: number;

  /**
   * True when all assets have completed loading and progress is 100.
   */
  readonly isLoaded: boolean;

  /**
   * True while the loading screen is active (loading + exit animation).
   */
  readonly isLoading: boolean;

  /**
   * Becomes true when the exit animation hits 80%, triggering page content animations.
   */
  readonly canAnimate: boolean;

  /**
   * Number of assets successfully loaded so far.
   */
  readonly loadedCount: number;

  /**
   * Total number of assets being tracked.
   */
  readonly totalCount: number;

  /**
   * Callback invoked by the LoadingScreen when its exit animation completes 80%.
   */
  readonly triggerContentAnimation: () => void;

  /**
   * Callback invoked when the loading screen has completely vanished.
   */
  readonly finishLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);
