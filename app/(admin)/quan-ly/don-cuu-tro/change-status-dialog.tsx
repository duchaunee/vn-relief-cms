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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface VerificationDialogProps {
  item: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function VerificationDialog({
  item,
  onConfirm,
  onCancel,
}: VerificationDialogProps) {
  const [verificationStatus, setVerificationStatus] = useState(
    item.status.verify
  );

  const queryClient = useQueryClient();
  const verifyMutation = useMutation({
    mutationFn: () =>
      RESCUE_REQUEST_APIS.update(item._id, {
        status: {
          verify: verificationStatus,
        },
      }),
    onSuccess: () => {
      queryClient.refetchQueries("rescuerequest");
      toast.success("Cập nhật trạng thái xác minh thành công");
      onCancel();
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái xác minh");
    },
  });

  const handleUpdate = async () => {
    verifyMutation.mutate();
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">
            Trạng thái xác minh
          </DialogTitle>
          <DialogDescription>
            Vui lòng chọn trạng thái xác minh cho yêu cầu cứu trợ này
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <RadioGroup
            value={verificationStatus}
            onValueChange={setVerificationStatus}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="closed" id="closed" className="w-5 h-5" />
              <Label
                htmlFor="closed"
                className="flex-1 cursor-pointer font-medium"
              >
                Đã xác minh
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <RadioGroupItem
                value="pending"
                id="pending"
                className="w-5 h-5"
              />
              <Label
                htmlFor="pending"
                className="flex-1 cursor-pointer font-medium"
              >
                Đang chờ xác minh
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Huỷ
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={verifyMutation.isPending}
            className="min-w-[100px]"
          >
            {verifyMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
