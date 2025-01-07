"use client";

import { useState, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RequiredLabel } from "@/components/require-field/require-label";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode } from "@/utils/helper/common";
import firebaseApi from "@/configs/firebase/firebase.stogare";
import toast from "react-hot-toast";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";
import { getCurrentUser } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface SupportLocationForm {
  currentSituation: string;
  supportAbility: string;
  address: string;
  phone: string;
  description: string;
  capacity: string;
  images: string[];
  wardCode: string;
}

interface ValidationErrors {
  currentSituation?: string;
  supportAbility?: string;
  address?: string;
  phone?: string;
  description?: string;
  capacity?: string;
  wardCode?: string;
}

interface ImagePreview {
  url: string;
  file: File;
}

const FormError = ({ message }: { message: string }) => (
  <span className="text-sm text-red-500 mt-1">{message}</span>
);

const handleImageUpload = async (files: File[]) => {
  try {
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        return await firebaseApi.uploadImageToFirebase(file);
      })
    );
    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export default function ResidenceForm() {
  const [formData, setFormData] = useState<SupportLocationForm>({
    currentSituation: "",
    supportAbility: "",
    address: "",
    phone: "",
    description: "",
    capacity: "",
    images: [],
    wardCode: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);

  // Location state
  const [provinces, setProvinces] = useState(dataLocation);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProvince) {
      const province = findProvinceByCode(selectedProvince);
      if (province) {
        setDistricts(province.districts);
      }
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(null);
    setWards([]);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const province = findProvinceByCode(selectedProvince);
      const district = province?.districts.find(
        (d) => d.code === selectedDistrict
      );
      if (district) {
        setWards(district.wards);
      }
    } else {
      setWards([]);
    }
  }, [selectedProvince, selectedDistrict]);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.currentSituation.trim()) {
      newErrors.currentSituation = "Vui lòng nhập tình trạng hiện tại";
    }

    if (!formData.supportAbility.trim()) {
      newErrors.supportAbility = "Vui lòng nhập khả năng hỗ trợ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = "Vui lòng nhập sức chứa";
    }

    if (!formData.wardCode) {
      newErrors.wardCode = "Vui lòng chọn địa điểm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const user = getCurrentUser();
  const queryClient = useQueryClient();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Upload images to Firebase
        const imageUrls = await handleImageUpload(
          imageFiles.map((img) => img.file)
        );

        const submitData = {
          ...formData,
          images: imageUrls,
        };

        await SUPPORT_LOCATION_APIS.save("residence", {
          locationType: "residence",
          userId: user._id,
          ...submitData,
        });
        queryClient.invalidateQueries("support-location-residence");
        toast.success("Đã lưu thông tin thành công");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Có lỗi xảy ra khi lưu thông tin");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
    }
  };

  return (
    <Card className="mx-auto w-full border-none shadow-none">
      <CardContent>
        <form id="residence-form-id" onSubmit={onSubmit} className="space-y-8">
          {/* Current Situation */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">
                Tình trạng hiện tại
              </Label>
            </RequiredLabel>
            <Textarea
              name="currentSituation"
              value={formData.currentSituation}
              onChange={handleInputChange}
              className={cn(errors.currentSituation && "border-red-500")}
              placeholder="Mô tả tình trạng hiện tại..."
            />
            {errors.currentSituation && (
              <FormError message={errors.currentSituation} />
            )}
          </div>

          {/* Support Ability */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">Khả năng hỗ trợ</Label>
            </RequiredLabel>
            <Textarea
              name="supportAbility"
              value={formData.supportAbility}
              onChange={handleInputChange}
              className={cn(errors.supportAbility && "border-red-500")}
              placeholder="Mô tả khả năng hỗ trợ..."
            />
            {errors.supportAbility && (
              <FormError message={errors.supportAbility} />
            )}
          </div>

          {/* Location Selection */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Tỉnh/Thành phố</Label>
              <Select
                onValueChange={(value) => {
                  setSelectedProvince(Number(value));
                  setFormData((prev) => ({
                    ...prev,
                    wardCode: `||${value}`,
                  }));
                }}
              >
                <SelectTrigger
                  className={cn("mt-2", errors.wardCode && "border-red-500")}
                >
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
            </div>

            <div>
              <Label className="text-base font-medium">Quận/Huyện</Label>
              <Select
                disabled={!selectedProvince}
                onValueChange={(value) => {
                  setSelectedDistrict(Number(value));
                  setFormData((prev) => ({
                    ...prev,
                    wardCode: `|${value}|${selectedProvince}`,
                  }));
                }}
              >
                <SelectTrigger
                  className={cn("mt-2", errors.wardCode && "border-red-500")}
                >
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
            </div>

            <div>
              <Label className="text-base font-medium">Phường/Xã</Label>
              <Select
                disabled={!selectedDistrict}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    wardCode: `${value}|${selectedDistrict}|${selectedProvince}`,
                  }));
                }}
              >
                <SelectTrigger
                  className={cn("mt-2", errors.wardCode && "border-red-500")}
                >
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

            {errors.wardCode && <FormError message={errors.wardCode} />}

            {/* Address */}
            <div>
              <RequiredLabel>
                <Label className="text-base font-medium">Địa chỉ cụ thể</Label>
              </RequiredLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={cn(errors.address && "border-red-500")}
                placeholder="Nhập số nhà, tên đường..."
              />
              {errors.address && <FormError message={errors.address} />}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">
                Số điện thoại liên hệ
              </Label>
            </RequiredLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              type="tel"
              className={cn(errors.phone && "border-red-500")}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && <FormError message={errors.phone} />}
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">Sức chứa</Label>
            </RequiredLabel>
            <Input
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className={cn(errors.capacity && "border-red-500")}
              placeholder="Ví dụ: 30 người hoặc 100m2"
            />
            {errors.capacity && <FormError message={errors.capacity} />}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Mô tả thêm</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Thông tin bổ sung khác..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Hình ảnh</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
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
        </form>
      </CardContent>
    </Card>
  );
}
