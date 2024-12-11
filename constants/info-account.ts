import TabAccount from "@/app/(main-layout)/tai-khoan/_components/tab-content/tab-account";
import TabRequest from "@/app/(main-layout)/tai-khoan/_components/tab-content/tab-request";
import { Bell, CircleUser, CreditCard, Eye, PaintBucket } from "lucide-react";

export const menuAccountItems = [
  {
    value: "account",
    label: "Tài khoản",
    component: TabAccount,
    icon: CircleUser,
  },
  {
    value: "requests",
    label: "Các yêu cầu cứu trợ đã gửi",
    component: TabRequest,
    icon: CreditCard,
  },
  {
    value: "verified",
    label: "Các yêu cầu cứu trợ đã xác minh",
    component: TabAccount,
    icon: PaintBucket,
  },
  {
    value: "notifications",
    label: "Notifications",
    component: TabRequest,
    icon: Bell,
  },
  { value: "display", label: "Display", component: TabRequest, icon: Eye },
];
