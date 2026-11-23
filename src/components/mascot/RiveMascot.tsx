"use client";

import {
  useRive,
  Layout,
  Fit,
  Alignment,
  type UseRiveParameters,
} from "@rive-app/react-canvas";

export interface RiveMascotProps {
  /** Path to the `.riv` file inside `public/` (e.g. `/rive/mascot.riv`) */
  src: string;
  /** Optional Artboard name */
  artboard?: string;
  /** Optional State Machine name(s) */
  stateMachines?: string | string[];
  /** Autoplay animation on mount (defaults to true) */
  autoplay?: boolean;
  /** Layout fit mode (defaults to Fit.Contain) */
  fit?: Fit;
  /** Layout alignment (defaults to Alignment.Center) */
  alignment?: Alignment;
  /** Container className */
  className?: string;
  /** Additional Rive hook parameters */
  options?: Partial<UseRiveParameters>;
}

export function RiveMascot({
  src,
  artboard,
  stateMachines,
  autoplay = true,
  fit = Fit.Contain,
  alignment = Alignment.Center,
  className = "h-48 w-48",
  options,
}: RiveMascotProps) {
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines,
    autoplay,
    layout: new Layout({
      fit,
      alignment,
    }),
    ...options,
  });

  return (
    <div className={className} aria-label="Interactive mascot">
      <RiveComponent className="h-full w-full" />
    </div>
  );
}
