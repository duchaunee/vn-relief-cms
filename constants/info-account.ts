import TabAccount from "@/app/(client)/(main-layout)/tai-khoan/_components/tab-content/tab-account";
import TabRescueRequest from "@/app/(client)/(main-layout)/tai-khoan/_components/tab-content/tab-rescue-request/page";
import RescueTeamDashboard from "@/app/(client)/(main-layout)/tai-khoan/_components/tab-content/tab-rescue-team/tab-rescue-team";
import VehicleManagementDashboard from "@/app/(client)/(main-layout)/tai-khoan/_components/tab-content/tab-vehicle/tab-vehicle";
import WarehouseDashboard from "@/app/(client)/(main-layout)/tai-khoan/_components/tab-content/tab-warehouse/tab-warehouse";

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
    label: "Quản lý đơn cứu trợ",
    component: TabRescueRequest,
    icon: CreditCard,
  },
  {
    value: "rescue-team",
    label: "Quản lý đội cứu trợ của bạn",
    component: RescueTeamDashboard,
    icon: PaintBucket,
  },
  {
    value: "vehicle",
    label: "Quản lý phương tiện của bạn",
    component: VehicleManagementDashboard,
    icon: PaintBucket,
  },
  {
    value: "warehouse",
    label: "Quản lý địa điểm tập kết của bạn",
    component: VehicleManagementDashboard,
    icon: PaintBucket,
  },
  // {
  //   value: "display",
  //   label: "Quản lý bài đăng của bạn",
  //   component: TabAccount,
  //   icon: Eye,
  // },
];
