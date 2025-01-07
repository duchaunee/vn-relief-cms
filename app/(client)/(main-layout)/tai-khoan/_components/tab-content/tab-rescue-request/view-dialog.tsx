import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ViewDialogProps {
  item: any;
  onClose: () => void;
}

export default function ViewDialog({ item, onClose }: ViewDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Mô tả:</span>
            <span className="col-span-3">{item.description}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Nội dung cứu trợ:</span>
            <span className="col-span-3">{item.contentNeedsRelief}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Số người cần hỗ trợ:</span>
            <span className="col-span-3">{item.numberOfPeopleNeedingHelp}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Số điện thoại:</span>
            <span className="col-span-3">{item.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">
              Người ưu tiên liên hệ:
            </span>
            <span className="col-span-3">{item.priorityContact}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Địa chỉ:</span>
            <span className="col-span-3">{item.address}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Trạng thái:</span>
            <span className="col-span-3">
              {item.status.verify} / {item.status.recipient}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
