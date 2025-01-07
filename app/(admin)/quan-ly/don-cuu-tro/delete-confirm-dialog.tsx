import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteConfirmDialogProps {
  item: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  item,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  const deleteMutation = useMutation({
    mutationFn: () => RESCUE_REQUEST_APIS.delete(item._id),
    onSuccess: () => {
      toast.success("Xóa yêu cầu cứu trợ thành công");
      onConfirm();
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa yêu cầu cứu trợ");
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xoá</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xoá yêu cầu cứu trợ này? Hành động này không
            thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Huỷ
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
