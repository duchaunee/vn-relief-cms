"use client";

import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipContainer from "../tooltip-container/tooltip-container";
import { cn } from "@/lib/utils";

interface ExpandIconProps {
  onClick?: () => void;
  content?: string;
  className?: string;
}

export function ExpandIcon({
  onClick,
  content = "Mở rộng",
  className,
}: ExpandIconProps) {
  const icon = (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn("h-8 w-8", className)}
    >
      <Expand className="h-4 w-4" />
    </Button>
  );

  return <TooltipContainer trigger={icon} content={content} />;
}
