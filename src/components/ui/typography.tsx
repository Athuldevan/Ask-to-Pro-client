import { cn } from "@/lib/utils";

// H1
export function TypographyH1({ children, className, variant }: never) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-5xl font-extrabold tracking-tight text-balance text-foreground",

        
        variant === "primary" && "bg-purple-700",

        className
      )}
    >
      {children}
    </h1>
  );
}

// Paragraph
export function TypographyP({ children, className }:never) {
  return (
    <p
      className={cn("leading-7 text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}
