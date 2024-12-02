"use client";

import { Fragment } from "react";

import { STATUS_CONFIG } from "@/constants/bagde-status";
import { cn } from "@/lib/utils";

import { StatusBadgeProps, StatusType } from "@/types/status";
import { Ibreadcrumb } from "@/types/breadcrumb";

import { breadcrumbItems } from "@/constants";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomBreadcrumb = () => {
  const currentPathname = usePathname();

  const getCurrentBreadcrumbItems = (): Ibreadcrumb["bread-crum"] | null => {
    const pathParts = currentPathname.split("/");
    const matchedItem = breadcrumbItems.find((item) => {
      const itemPathParts = item.url.split("/");
      if (itemPathParts.length !== pathParts.length) return false;
      for (let i = 0; i < itemPathParts.length; i++) {
        if (itemPathParts[i] === "[id]" || itemPathParts[i] === pathParts[i])
          continue;
        return false;
      }
      return true;
    });
    return matchedItem ? matchedItem["bread-crum"] : null;
  };

  const items = getCurrentBreadcrumbItems();

  return (
    <Fragment>
      <div
        className={cn(
          "hidden lg:flex z-[15] sticky top-14 left-0 w-full bg-white border-b border-b-gray-300 px-4 py-3 min-h-12 lg:mb-0"
        )}
      >
        <Breadcrumb className="flex bg-transparent">
          <BreadcrumbList>
            {items &&
              items.map((item, index) => (
                <Fragment key={`item-${index}`}>
                  <BreadcrumbItem>
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
                </Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </Fragment>
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
