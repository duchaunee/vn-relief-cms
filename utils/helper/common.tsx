"use client";

import { STATUS_CONFIG } from "@/constants/bagde-status";
import { cn } from "@/lib/utils";
import { StatusBadgeProps, StatusType } from "@/types/status";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Ibreadcrumb } from "@/types/breadcrumb";
import { redirect } from "next/navigation";
import Link from "next/link";

export const CustomBreadcrumb = ({ items = [] }: { items: Ibreadcrumb[] }) => {
  return (
    <div className="fixed lg:sticky z-[15] top-14 left-0 w-full bg-white flex border-b border-b-gray-300 px-4 py-3 h-12">
      <Breadcrumb className="flex bg-transparent">
        <BreadcrumbList>
          {items.map((item, index) => (
            <>
              <BreadcrumbItem key={`item-${index}`}>
                {item.isPage ? (
                  <BreadcrumbPage>{item.text}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild={true}>
                    <Link href={item.link}>{item.text}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator key={`separator-${index}`} />
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

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
