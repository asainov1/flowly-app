"use client";

const variantStyles = {
  text: "h-4 w-3/4 rounded",
  card: "h-32 w-full rounded-xl",
  chart: "h-64 w-full rounded-xl",
};

interface SkeletonProps {
  variant?: keyof typeof variantStyles;
  className?: string;
}

export function Skeleton({ variant = "text", className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/5 ${variantStyles[variant]} ${className}`}
    />
  );
}
