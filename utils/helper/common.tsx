import { STATUS_CONFIG } from "@/constants/bagde-status";
import { cn } from "@/lib/utils";
import _ from "lodash";

import { StatusBadgeProps, StatusType } from "@/types/status";
import { RequestData } from "@/types/models/rescue-request";
import { GroupedData } from "@/types";

import dataLocation from "@/constants/location.json";
import { format } from "date-fns";

export const StatusBadge = ({
  status,
  className,
  showText = true,
}: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-[2px] rounded-md text-sm font-medium border",
        config.background,
        config.text,
        config.border,
        className
      )}
    >
      {config.icon}
      <p className="mt-[2px]">{showText && config.content}</p>
    </span>
  );
};

// Helper function để lấy màu cho các trường hợp cần dùng riêng
export const getStatusColor = (status: StatusType) => {
  return {
    background: STATUS_CONFIG[status].background,
    text: STATUS_CONFIG[status].text,
    border: STATUS_CONFIG[status].border,
  };
};

export const transformData = (data: RequestData[]): GroupedData[] => {
  const grouped: Record<string, RequestData[]> = _.groupBy(data, (item) => {
    const parts = item.wardCode.split("|");
    return parts[1]; // Group theo phần tử thứ 2
  });

  // Transform thành format mong muốn
  return Object.entries(grouped).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, items]): GroupedData => ({
      address: items[0].wardCode.split("|").slice(1).join("|"),
      count: items.length,
      groupRequest: items.map((item: RequestData): RequestData => item),
    })
  );
};

// Hàm tìm tỉnh/thành phố
export function findProvinceByCode(provinceCode: number) {
  return dataLocation.find((p) => p.code === provinceCode);
}

// Hàm tìm huyện/quận
export function findDistrictByCode(provinceCode: number, districtCode: number) {
  const province = findProvinceByCode(provinceCode);
  if (!province) return null;
  return province.districts.find((d) => d.code === districtCode);
}

// Hàm tìm xã/phường
export function findWardByCode(
  provinceCode: number,
  districtCode: number,
  wardCode: number
) {
  const district = findDistrictByCode(provinceCode, districtCode);
  if (!district) return null;
  return district.wards.find((w) => w.code === wardCode);
}

// Hàm tổng hợp để tìm chuỗi "Xã..., Huyện..., Tỉnh..."
export function findLocation(codes: string) {
  const [wardCode, districtCode, provinceCode] = codes.split("|").map(Number);

  const province = findProvinceByCode(provinceCode);
  if (!province) return "Tỉnh không tồn tại";

  const district = findDistrictByCode(provinceCode, districtCode);
  if (!district) return "Huyện/Quận không tồn tại";

  const ward = findWardByCode(provinceCode, districtCode, wardCode);
  if (!ward) return "Xã/Phường không tồn tại";

  return `${ward.name}, ${district.name}, ${province.name}`;
}

export function copyTextToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      console.log("Đã sao chép vào clipboard: " + text);
    })
    .catch(function (err) {
      console.error("Lỗi khi sao chép: ", err);
    });
}

export const handleShare = async (title: string, text: string, url: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
      console.log("Chia sẻ thành công!");
    } catch (err) {
      console.error("Lỗi khi chia sẻ: ", err);
    }
  } else {
    console.log("Trình duyệt của bạn không hỗ trợ chia sẻ.");
  }
};

export const formatDate = (date: string) =>
  format(new Date(date), "MM/dd/yyyy hh:mm:ss a");

export const formatPhoneNumber = (phone: string) => {
  return phone.startsWith("+") ? phone : `+84${phone.slice(1)}`;
};

export const formatStatusMessagesReceivedRescueRequest = (data) => {
  const messages = [];

  // Collect all messages with timestamps
  if (data.transportSupplies) {
    data.transportSupplies.forEach((supply) => {
      messages.push({
        type: "transport",
        timestamp: new Date(supply.createdAt),
        userName: supply.vehicleId.ownerId.name,
        items: supply.amount
          .map((item) => `${item.quantity} ${item.item.unit} ${item.item.name}`)
          .join(", "),
        createdAt: supply.createdAt,
      });
    });
  }

  if (data.userContributions) {
    data.userContributions.forEach((contribution) => {
      messages.push({
        type: "contribution",
        timestamp: new Date(contribution.createdAt),
        userName: contribution.userId.name,
        items: contribution.amount
          .map((item) => `${item.quantity} ${item.item.unit} ${item.item.name}`)
          .join(", "),
        createdAt: contribution.createdAt,
      });
    });
  }

  // Sort by timestamp descending (newest first)
  messages.sort((a, b) => b.timestamp - a.timestamp);

  // Format messages after sorting
  return messages.map((msg) => ({
    type: msg.type,
    message: `Người dùng ${msg.userName} vừa ${
      msg.type === "transport" ? "đăng ký vận chuyển" : "đăng ký hỗ trợ"
    } ${msg.items} lúc ${formatDate(msg.createdAt)}`,
  }));
};

export function convertTypeToDescription(type: any) {
  const typeMapping = {
    temporary_stop: "Địa điểm dừng chân",
    residence: "Địa điểm tạm trú",
    warehouse: "Kho tập kết",
    commissariat: "Nơi tiếp tế lương thực",
  };

  return typeMapping[type] || "Loại địa điểm không hợp lệ";
}
