import { StatusConfig, StatusType } from "@/types/status";
import {
  Clock,
  CheckCircle2,
  Search,
  CalendarCheck,
  HeartHandshake,
  HelpCircle,
  ThumbsUp,
} from "lucide-react";

export const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  "verify-pending": {
    content: "Chờ xác minh thông tin",
    background: "bg-yellow-50",
    text: "text-yellow-600",
    border: "border-yellow-200",
    icon: <Clock className="w-4 h-4" />,
  },
  "verify-closed": {
    content: "Đã xác minh",
    background: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  "recipient-pending": {
    content: "Đang tìm đội cứu trợ",
    background: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    icon: <Search className="w-4 h-4" />,
  },
  "recipient-doing": {
    content: "Đã có kế hoạch cứu trợ",
    background: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-200",
    icon: <CalendarCheck className="w-4 h-4" />,
  },
  "recipient-closed": {
    content: "Cứu trợ thành công",
    background: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    icon: <HeartHandshake className="w-4 h-4" />,
  },
  "goods-pending": {
    content: "Đang cần hỗ trợ",
    background: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  "goods-closed": {
    content: "Đã đủ nguồn hỗ trợ",
    background: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-200",
    icon: <ThumbsUp className="w-4 h-4" />,
  },
};
