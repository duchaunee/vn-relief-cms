import { Ibreadcrumb } from "@/types/breadcrumb";

export const breadcrumbItems: Ibreadcrumb[] = [
  {
    url: "/",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: true,
      },
    ],
  },
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
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
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
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
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
  {
    url: "/can-ho-tro",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các nơi đang cần hỗ trợ khắc phục sau thiên tai",
        link: "/can-ho-tro",
        isPage: true,
      },
    ],
  },
  {
    url: "/can-ho-tro/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các nơi đang cần hỗ trợ khắc phục sau thiên tai",
        link: "/can-ho-tro",
        isPage: false,
      },
      {
        text: "Thông tin cần hỗ trợ",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/doi-cuu-tro",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các đội cứu trợ đang hoạt động",
        link: "/doi-cuu-tro",
        isPage: true,
      },
    ],
  },
  {
    url: "/doi-cuu-tro/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các đội cứu trợ đang hoạt động",
        link: "/doi-cuu-tro",
        isPage: false,
      },
      {
        text: "Thông tin đội cứu trợ",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/phuong-tien",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các phương tiện đang hoạt động",
        link: "/phuong-tien",
        isPage: true,
      },
    ],
  },
  {
    url: "/phuong-tien/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các phương tiện đang hoạt động",
        link: "/phuong-tien",
        isPage: false,
      },
      {
        text: "Thông tin phương tiện",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/tinh-nguyen-vien",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các tình nguyện viên đang hoạt động",
        link: "/tinh-nguyen-vien",
        isPage: true,
      },
    ],
  },
  {
    url: "/tinh-nguyen-vien/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các tình nguyện viên đang hoạt động",
        link: "/tinh-nguyen-vien",
        isPage: false,
      },
      {
        text: "Thông tin tình nguyện viên",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-dung-chan",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các điểm dừng chân đang hoạt động",
        link: "/dia-diem-dung-chan",
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-dung-chan/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các điểm dừng chân đang hoạt động",
        link: "/dia-diem-dung-chan",
        isPage: false,
      },
      {
        text: "Thông tin điểm dừng chân",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tam-tru",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các điểm tạm trú đang hoạt động",
        link: "/dia-diem-tam-tru",
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tam-tru/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các điểm tạm trú đang hoạt động",
        link: "/dia-diem-tam-tru",
        isPage: false,
      },
      {
        text: "Thông tin điểm tạm trú",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tap-ket",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các địa điểm tập kết đang hoạt động",
        link: "/dia-diem-tap-ket",
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tap-ket/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các địa điểm tập kết đang hoạt động",
        link: "/dia-diem-tap-ket",
        isPage: false,
      },
      {
        text: "Thông tin kho tập kết",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tiep-te",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các địa điểm tiếp tế lương thực",
        link: "/dia-diem-tiep-te",
        isPage: true,
      },
    ],
  },
  {
    url: "/dia-diem-tiep-te/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin các địa điểm tiếp tế lương thực",
        link: "/dia-diem-tiep-te",
        isPage: false,
      },
      {
        text: "Thông tin tiếp tế lương thực",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/lien-lac-chinh-quyen",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin liên lạc chính quyền các khu vực",
        link: "/lien-lac-chinh-quyen",
        isPage: true,
      },
    ],
  },
  {
    url: "/tin-tuc-thien-tai",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin tin tức thiên tai",
        link: "/tin-tuc-thien-tai",
        isPage: true,
      },
    ],
  },
  {
    url: "/tin-tuc-thien-tai/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin tin tức thiên tai",
        link: "/tin-tuc-thien-tai",
        isPage: false,
      },
      {
        text: "Thông tin thiên tai",
        link: null,
        isPage: true,
      },
    ],
  },
  {
    url: "/ung-ho-thien-tai",
    isShowMobile: false,
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin ủng hộ khắc phục thiên tai",
        link: "/ung-ho-thien-tai",
        isPage: true,
      },
    ],
  },
  {
    url: "/ung-ho-thien-tai/[id]",
    "bread-crum": [
      {
        text: "Trang chủ",
        link: "/",
        isPage: false,
      },
      {
        text: "Thông tin ủng hộ khắc phục thiên tai",
        link: "/ung-ho-thien-tai",
        isPage: false,
      },
      {
        text: "Thông tin ủng hộ thiên tai",
        link: null,
        isPage: true,
      },
    ],
  },
];
