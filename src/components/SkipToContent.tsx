import { cn } from "@/lib/utils";

export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-[9999]",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "font-medium text-sm",
        "transform -translate-y-full opacity-0",
        "focus:translate-y-0 focus:opacity-100",
        "transition-all duration-300",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2"
      )}
      onFocus={(e) => {
        e.currentTarget.style.transform = "translateX(-50%) translateY(0)";
        e.currentTarget.style.opacity = "1";
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "translateX(-50%) translateY(-100%)";
        e.currentTarget.style.opacity = "0";
      }}
    >
      Skip to main content
    </a>
  );
};