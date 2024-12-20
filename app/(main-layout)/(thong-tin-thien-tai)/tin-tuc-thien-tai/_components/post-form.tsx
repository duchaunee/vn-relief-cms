import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

export const PostForm = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col ">
      <div className="my-4 overflow-y-auto space-y-4 px-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" placeholder="Nhập tiêu đề bài viết" />
          </div>

          <div className="space-y-2">
            <Label>Địa điểm</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Xã" />
              <Input placeholder="Huyện" />
              <Input placeholder="Tỉnh" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="households">Số hộ bị ảnh hưởng</Label>
            <Input
              id="households"
              type="number"
              placeholder="Nhập số hộ bị ảnh hưởng"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả chi tiết</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả chi tiết về tình hình"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Thêm ảnh mô tả</Label>
            <label
              htmlFor="image-news"
              className="border-2 border-dashed border-gray-300 rounded-lg h-[150px] aspect-square flex items-center justify-center lg:hover:border-gray-500 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2 p-2">
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">
                  Thêm ảnh
                </span>
                <Input
                  id="image-news"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-gray-200 flex items-center justify-end gap-3 px-6 py-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Huỷ
        </Button>
        <Button type="submit">Đăng bài</Button>
      </div>
    </form>
  );
};
