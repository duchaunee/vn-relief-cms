export type StatusType =
  | "Chờ xác minh thông tin"
  | "Đã xác minh"
  | "Đang tìm đội cứu trợ"
  | "Đã có kế hoạch cứu trợ"
  | "Cứu trợ thành công"
  | "Đang cần hỗ trợ"
  | "Đã đủ nguồn hỗ trợ";

export interface StatusConfig {
  background: string;
  text: string;
  border: string;
  icon: React.ReactNode;
}

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showText?: boolean; // Tuỳ chọn ẩn/hiện text
}
