import { useState, useEffect } from "react";
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
import { Camera, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode } from "@/utils/helper/common";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import toast from "react-hot-toast";
import firebaseApi from "@/configs/firebase/firebase.stogare";

interface ImagePreview {
  url: string;
  file: File;
}

interface EditDialogProps {
  item: any;
  onSave: (updatedItem: any) => void;
  onClose: () => void;
}

export default function EditDialog({ item, onSave, onClose }: EditDialogProps) {
  const [editedItem, setEditedItem] = useState(item);
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);

  useEffect(() => {
    if (item.images && item.images.length > 0) {
      const initialImages = item.images.map((url: string) => ({
        url,
        file: null, // Ảnh có sẵn không cần file object
      }));
      setImageFiles(initialImages);
    }
  }, [item.images]);
  const [provinces, setProvinces] = useState(dataLocation);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    if (editedItem.wardCode) {
      const [ward, district, province] = editedItem.wardCode.split("|");
      if (province) {
        setSelectedProvince(Number(province));
        const provinceData = findProvinceByCode(Number(province));
        if (provinceData) {
          setDistricts(provinceData.districts);
          if (district) {
            setSelectedDistrict(Number(district));
            const districtData = provinceData.districts.find(
              (d) => d.code === Number(district)
            );
            if (districtData) {
              setWards(districtData.wards);
            }
          }
        }
      }
    }
  }, [editedItem.wardCode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleImageUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImageFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (value: string, type: string) => {
    switch (type) {
      case "province":
        setSelectedProvince(Number(value));
        setEditedItem({ ...editedItem, wardCode: `||${value}` });
        break;
      case "district":
        setSelectedDistrict(Number(value));
        setEditedItem({
          ...editedItem,
          wardCode: `|${value}|${selectedProvince}`,
        });
        break;
      case "ward":
        setEditedItem({
          ...editedItem,
          wardCode: `${value}|${selectedDistrict}|${selectedProvince}`,
        });
        break;
    }
  };

  const handleSave = async () => {
    try {
      // Xử lý upload ảnh mới
      const newImages = imageFiles.filter((img) => img.file);
      // Giữ lại các ảnh cũ không bị xóa
      const existingImages = imageFiles
        .filter((img) => !img.file) // Lọc ra các ảnh không có file (ảnh cũ)
        .map((img) => img.url);

      let uploadedUrls = [];
      if (newImages.length > 0) {
        uploadedUrls = await Promise.all(
          newImages.map((img) => firebaseApi.uploadImageToFirebase(img.file))
        );
      }

      const updatedItem = {
        ...editedItem,
        images: [...existingImages, ...uploadedUrls],
      };

      await RESCUE_REQUEST_APIS.update(item._id, updatedItem);
      toast.success("Cập nhật thành công!");
      onSave(updatedItem);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Có lỗi xảy ra khi cập nhật!");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto bg-white">
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

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Địa điểm</Label>
            <div className="col-span-3 space-y-4">
              <Select
                value={selectedProvince?.toString()}
                onValueChange={(value) =>
                  handleLocationChange(value, "province")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem
                      key={province.code}
                      value={province.code.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDistrict?.toString()}
                onValueChange={(value) =>
                  handleLocationChange(value, "district")
                }
                disabled={!selectedProvince}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem
                      key={district.code}
                      value={district.code.toString()}
                    >
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={editedItem.wardCode?.split("|")[0]}
                onValueChange={(value) => handleLocationChange(value, "ward")}
                disabled={!selectedDistrict}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward.code} value={ward.code.toString()}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Địa chỉ cụ thể
            </Label>
            <Input
              id="address"
              name="address"
              value={editedItem.address}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nhập số nhà, tên đường..."
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Hình ảnh</Label>
            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-4">
                {imageFiles.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url}
                      alt={`Preview ${index}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="relative h-32 cursor-pointer rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-500">
                    <Camera className="h-8 w-8" />
                    <span className="text-sm">Thêm ảnh</span>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    multiple
                    accept="image/*"
                    onChange={handleImageUploadChange}
                  />
                </div>
              </div>
            </div>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
