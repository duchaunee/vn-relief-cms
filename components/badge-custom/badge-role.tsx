import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const RoleBadge = ({ roleCode, name = null }) => {
  const getRoleInfo = (code) => {
    switch (code) {
      case 0:
        return {
          className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          tooltipText: "Admin nền tảng VNRelief",
        };
      case 1:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          tooltipText: "Thành viên đội cứu trợ",
        };
      case 2:
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-200",
          tooltipText: "Tình nguyện viên thu thập",
        };
      case 3:
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-200",
          tooltipText: "Tình nguyện viên hotline",
        };
      case 4:
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          tooltipText: "Tình nguyện viên xác minh",
        };
      case 5:
        return {
          className: "bg-purple-100 text-purple-800 hover:bg-purple-200",
          tooltipText: "Thành viên thường",
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          tooltipText: "Không xác định",
        };
    }
  };

  const roleInfo = getRoleInfo(roleCode);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <Badge
          variant="secondary"
          className={cn(
            "cursor-pointer transition-all duration-200",
            roleInfo.className
          )}
        >
          {name || roleInfo.tooltipText}
        </Badge>
        <TooltipContent>
          <p>{roleInfo.tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoleBadge;
