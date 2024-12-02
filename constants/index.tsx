import { Ibreadcrumb } from "@/types/breadcrumb";

export const breadcrumbItems: Ibreadcrumb[] = [
  {
    url: "/cuu-tro-khan-cap",
    "bread-crum": [
      {
        text: "Thông tin các nơi đang cần cứu trợ khẩn cấp",
        link: "/cuu-tro-khan-cap",
        isPage: true,
      },
    ],
  },
  {
    url: "/cuu-tro-khan-cap/[id]",
    "bread-crum": [
      {
        text: "Thông tin các nơi đang cần cứu trợ khẩn cấp",
        link: "/cuu-tro-khan-cap",
        isPage: false,
      },
      {
        text: "Thông tin cần cứu trợ",
        link: null,
        isPage: true,
      },
    ],
  },
];
