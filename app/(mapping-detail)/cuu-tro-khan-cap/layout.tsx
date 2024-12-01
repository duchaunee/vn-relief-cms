import { Fragment } from "react";
import { CustomBreadcrumb } from "@/utils/helper/common";
import { Ibreadcrumb } from "@/types/breadcrumb";

const breadcrumbItems: Ibreadcrumb[] = [
  {
    text: "Thông tin các nơi đang cần cứu trợ khẩn cấp",
    link: "/cuu-tro-khan-cap",
    isPage: false,
  },
  // {
  //   text: "Thông tin cần cứu trợ",
  //   link: "",
  //   isPage: true,
  // },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <CustomBreadcrumb items={breadcrumbItems} />
      {children}
    </Fragment>
  );
}
