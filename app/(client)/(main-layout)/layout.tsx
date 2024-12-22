"use client";

import { CustomBreadcrumb } from "@/components/custom-bread-crumb/custom-bread-crumb";

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
