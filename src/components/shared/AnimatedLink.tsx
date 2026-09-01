import { Link, type LinkProps } from "react-router";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

export interface AnimatedLinkProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

export function AnimatedLink({ className, children, ...props }: AnimatedLinkProps) {
  return (
    <Link
      className={cn(
        "relative text-3xl font-medium mx-3",
        "before:absolute before:h-[0.2rem] before:w-full before:bg-text before:bottom-0 before:scale-x-0 before:origin-left",
        "hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
