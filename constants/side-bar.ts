import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const dataSidebar = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/logo/logo-vnrelief.png",
  },
  navMain: [
    {
      title: "Cứu trợ thiên tai",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Cứu trợ khẩn cấp",
          url: "/cuu-tro-khan-cap",
        },
        {
          title: "Thông tin các nơi cần hỗ trợ",
          url: "/can-ho-tro",
        },
      ],
    },
    {
      title: "Nhân lực cứu trợ",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Thông tin các đội cứu trợ",
          url: "/doi-cuu-tro",
        },
        {
          title: "Thông tin các tình nguyện viên",
          url: "/tinh-nguyen-vien",
        },
        {
          title: "Danh sách các phương tiện",
          url: "/phuong-tien",
        },
      ],
    },
    {
      title: "Địa điểm hỗ trợ",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Các địa điểm tạm trú",
          url: "/dia-diem-tam-tru",
        },
        {
          title: "Các địa điểm dừng chân",
          url: "/dia-diem-dung-chan",
        },
        {
          title: "Các địa điểm tập kết",
          url: "/dia-diem-tap-ket",
        },
        {
          title: "Các địa điểm tiếp tế",
          url: "/dia-diem-tiep-te",
        },
      ],
    },
    {
      title: "Thông tin thiên tai",
      isActive: true,
      icon: Settings2,
      items: [
        {
          title: "Thông tin liên lạc chính quyền",
          url: "/lien-lac-chinh-quyen",
        },
        {
          title: "Thông tin ủng hộ thiên tai",
          url: "/ung-ho-thien-tai",
        },
        {
          title: "Tin tức thiên tai",
          url: "/tin-tuc-thien-tai",
        },
      ],
    },
  ],
};
