import { Ibreadcrumb } from "@/types/breadcrumb";

export const breadcrumbItems: Ibreadcrumb[] = [
  {
    url: "/dang-nhap",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Đăng nhập vào nền tảng",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/dang-ky",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Đăng nhập vào nền tảng",
        link: "/dang-nhap",
        isPage: false,
      },
      {
        text: "Đăng ký tài khoản",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/thong-bao",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Tất cả thông báo",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/tai-khoan",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin tài khoản",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/ve-chung-toi",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Về chúng tôi",
        link: null,
        isPage: true,
      },
    ],
  },
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
