import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditDialogProps {
  item: any;
  onSave: (updatedItem: any) => void;
  onClose: () => void;
}

export default function EditDialog({ item, onSave, onClose }: EditDialogProps) {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa yêu cầu cứu trợ</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin yêu cầu cứu trợ tại đây.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Tiêu đề
            </Label>
            <Input
              id="title"
              name="title"
              value={editedItem.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              name="description"
              value={editedItem.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contentNeedsRelief" className="text-right">
              Nội dung cứu trợ
            </Label>
            <Textarea
              id="contentNeedsRelief"
              name="contentNeedsRelief"
              value={editedItem.contentNeedsRelief}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numberOfPeopleNeedingHelp" className="text-right">
              Số người cần hỗ trợ
            </Label>
            <Input
              id="numberOfPeopleNeedingHelp"
              name="numberOfPeopleNeedingHelp"
              type="number"
              value={editedItem.numberOfPeopleNeedingHelp}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              name="phone"
              value={editedItem.phone}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priorityContact" className="text-right">
              Người ưu tiên liên hệ
            </Label>
            <Input
              id="priorityContact"
              name="priorityContact"
              value={editedItem.priorityContact}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Địa chỉ
            </Label>
            <Input
              id="address"
              name="address"
              value={editedItem.address}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
