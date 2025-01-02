export type StatusType =
  | "verify-pending"
  | "verify-closed"
  | "recipient-pending"
  | "recipient-doing"
  | "recipient-closed"
  | "goods-pending"
  | "goods-closed";

export interface StatusConfig {
  content: string;
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
