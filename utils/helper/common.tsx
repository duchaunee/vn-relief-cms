import { STATUS_CONFIG } from "@/constants/bagde-status";
import { cn } from "@/lib/utils";

import { StatusBadgeProps, StatusType } from "@/types/status";

export const StatusBadge = ({
  status,
  className,
  showText = true,
}: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-[2px] rounded-md text-sm font-medium border",
        config.background,
        config.text,
        config.border,
        className
      )}
    >
      {config.icon}
      <p className="mt-[2px]">{showText && status}</p>
    </span>
  );
};

// Helper function để lấy màu cho các trường hợp cần dùng riêng
export const getStatusColor = (status: StatusType) => {
  return {
    background: STATUS_CONFIG[status].background,
    text: STATUS_CONFIG[status].text,
    border: STATUS_CONFIG[status].border,
  };
};
