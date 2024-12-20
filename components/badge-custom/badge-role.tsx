import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Phone,
  ClipboardList,
  Users2,
  UserCircle,
  HelpCircle,
} from "lucide-react";

const RoleBadge = ({ roleCode }) => {
  const getRoleInfo = (code) => {
    switch (code) {
      case 0:
        return {
          className: "bg-red-500 hover:bg-red-600",
          icon: Shield,
          tooltipText: "Quản trị viên hệ thống",
        };
      case 1:
        return {
          className: "bg-blue-500 hover:bg-blue-600",
          icon: ClipboardList,
          tooltipText: "Tình nguyện viên xác minh",
        };
      case 2:
        return {
          className: "bg-green-500 hover:bg-green-600",
          icon: Users2,
          tooltipText: "Tình nguyện viên thu thập",
        };
      case 3:
        return {
          className: "bg-yellow-500 hover:bg-yellow-600",
          icon: Phone,
          tooltipText: "Tình nguyện viên hotline",
        };
      case 4:
        return {
          className: "bg-purple-500 hover:bg-purple-600",
          icon: UserCircle,
          tooltipText: "Thành viên VNRelief",
        };
      default:
        return {
          className: "bg-gray-500 hover:bg-gray-600",
          icon: HelpCircle,
          tooltipText: "Không xác định",
        };
    }
  };

  const roleInfo = getRoleInfo(roleCode);
  const Icon = roleInfo.icon;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>
          <Badge
            className={`${roleInfo.className} text-white w-4 h-4 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform`}
          >
            <Icon size={16} />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{roleInfo.tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoleBadge;

// Usage example:
// <RoleBadge roleCode={0} /> -> Shows only Shield icon with tooltip on hover
// <RoleBadge roleCode={1} /> -> Shows only ClipboardList icon with tooltip on hover
