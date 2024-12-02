"use client";

import { Fragment } from "react";
import { CustomBreadcrumb } from "@/utils/helper/common";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <CustomBreadcrumb />
      {children}
    </Fragment>
  );
}
