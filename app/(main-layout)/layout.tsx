"use client";

import { CustomBreadcrumb } from "@/utils/helper/common";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col">
      <CustomBreadcrumb />
      {children}
    </div>
  );
}
