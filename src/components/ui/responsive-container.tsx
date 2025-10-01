import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface ResponsiveContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "wide" | "narrow";
  padding?: "default" | "none" | "large";
}

const ResponsiveContainer = forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  ({ className, variant = "default", padding = "default", ...props }, ref) => {
    const variants = {
      default: "max-w-6xl",
      wide: "max-w-7xl",
      narrow: "max-w-4xl"
    };

    const paddings = {
      default: "section-padding",
      none: "",
      large: "px-6 sm:px-12 md:px-16 lg:px-24"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      />
    );
  }
);

ResponsiveContainer.displayName = "ResponsiveContainer";

export { ResponsiveContainer };