"use client";

import { CustomBreadcrumb } from "@/components/custom-bread-crumb/custom-bread-crumb";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full flex flex-col">
      <CustomBreadcrumb />
      <div className="relative h-full">
        <Image
          src={"/logo/VN-right.png"}
          alt="logo-relief"
          width={320}
          height={320}
          className="fixed top-16 right-0 rounded-md lg:block hidden"
        ></Image>
        {children}
      </div>
    </div>
  );
}
