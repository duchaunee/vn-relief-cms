import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "dark"
  | "red"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink";

interface ColorBadgeProps {
  text: string;
  variant?: BadgeVariant;
  className?: string;
}

const ColorBadge = ({
  text,
  variant = "default",
  className,
}: ColorBadgeProps) => {
  const getVariantStyles = (variant: BadgeVariant) => {
    const baseStyles =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium transition-colors";

    const variantStyles: Record<BadgeVariant, string> = {
      default: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      dark: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      red: "bg-red-50 text-red-700 hover:bg-red-100",
      green: "bg-green-50 text-green-700 hover:bg-green-100",
      yellow: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
      indigo: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
      purple: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      pink: "bg-pink-50 text-pink-700 hover:bg-pink-100",
    };

    return cn(baseStyles, variantStyles[variant], className);
  };

  return <span className={getVariantStyles(variant)}>{text}</span>;
};

export default ColorBadge;
