"use client";

import React, { Fragment } from "react";

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
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import BackButton from "../button/back-header";

export const CustomBreadcrumb = () => {
  const currentPathname = usePathname();
  // ===== router
  const router = useRouter();

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
      {items.length > 1 && (
        <BackButton
          text={items?.at(-1).text}
          onClick={() => router.push(items?.at(-2).link)}
        />
      )}
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
