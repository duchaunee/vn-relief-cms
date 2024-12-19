import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const dataSidebar = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/logo/logo-vnrelief.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
          url: "#",
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
          url: "#",
        },
        {
          title: "Thông tin các tình nguyện viên",
          url: "#",
        },
        {
          title: "Danh sách các phương tiện",
          url: "#",
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
          url: "#",
        },
        {
          title: "Các địa điểm dừng chân",
          url: "#",
        },
        {
          title: "Các kho tập kết",
          url: "#",
        },
      ],
    },
    {
      title: "Thông tin liên lạc khẩn cấp",
      icon: Settings2,
      items: [
        {
          title: "Liên lạc chính quyền khu vực",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
