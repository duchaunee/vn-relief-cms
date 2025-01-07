import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ColorBadge from "@/components/badge-custom/badge-custom-color";
import { useEffect, useState } from "react";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode } from "@/utils/helper/common";

interface ViewDialogProps {
  item: any;
  onClose: () => void;
}

export default function ViewDialog({ item, onClose }: ViewDialogProps) {
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    if (item.wardCode) {
      const [wardCode, districtCode, provinceCode] = item.wardCode.split("|");
      if (provinceCode) {
        const province = findProvinceByCode(Number(provinceCode));
        if (province) {
          const district = province.districts.find(
            (d) => d.code === Number(districtCode)
          );
          if (district) {
            const ward = district.wards.find(
              (w) => w.code === Number(wardCode)
            );
            if (ward) {
              setLocationText(
                `${ward.name}, ${district.name}, ${province.name}`
              );
            }
          }
        }
      }
    }
  }, [item.wardCode]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết yêu cầu cứu trợ</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về yêu cầu cứu trợ.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Tiêu đề:</span>
            <span className="col-span-3">{item.title}</span>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <span className="text-right font-medium">Mô tả:</span>
            <span className="col-span-3 whitespace-pre-wrap">
              {item.description}
            </span>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <span className="text-right font-medium">Nội dung cứu trợ:</span>
            <span className="col-span-3 whitespace-pre-wrap">
              {item.contentNeedsRelief}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Địa chỉ:</span>
            <div className="col-span-3 space-y-1">
              <p>{locationText}</p>
              {item.address && <p className="text-gray-600">{item.address}</p>}
            </div>
          </div>

          {item.images && item.images.length > 0 && (
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right font-medium">Hình ảnh:</span>
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4">
                  {item.images.map((url: string, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Hình ảnh ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Số người cần hỗ trợ:</span>
            <span className="col-span-3">{item.numberOfPeopleNeedingHelp}</span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Số điện thoại:</span>
            <span className="col-span-3">{item.phone}</span>
          </div>

          {item.priorityContact && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">
                Người ưu tiên liên hệ:
              </span>
              <span className="col-span-3">{item.priorityContact}</span>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Trạng thái:</span>
            <div className="col-span-3 space-x-2">
              <ColorBadge
                text={
                  item.status.verify === "pending"
                    ? "Đang chờ xác minh"
                    : "Đã xác minh"
                }
                variant={item.status.verify === "pending" ? "yellow" : "green"}
              />
              <ColorBadge
                text={
                  item.status.recipient === "pending"
                    ? "Chưa có đội nhận"
                    : "Có đội nhận"
                }
                variant={
                  item.status.recipient === "pending" ? "yellow" : "green"
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
