import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { ResponsiveContainer } from "./responsive-container";

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "main" | "article";
  variant?: "default" | "wide" | "narrow";
  fullHeight?: boolean;
  centered?: boolean;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ 
    className, 
    as: Component = "section", 
    variant = "default", 
    fullHeight = true,
    centered = true,
    children,
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          "relative",
          fullHeight && "min-h-screen",
          centered && "flex items-center",
          "py-16 sm:py-24",
          className
        )}
        {...props}
      >
        <ResponsiveContainer variant={variant}>
          {children}
        </ResponsiveContainer>
      </Component>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export { SectionWrapper };