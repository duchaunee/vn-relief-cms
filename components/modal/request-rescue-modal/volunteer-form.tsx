import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Camera, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import firebaseApi from "@/configs/firebase/firebase.stogare";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode } from "@/utils/helper/common";

interface FormData {
  name: string;
  phone: string;
  role: string;
  fbLink: string;
  address: string;
  wardCode: string;
  avatar: string;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  role?: string;
  fbLink?: string;
  address?: string;
  wardCode?: string;
  avatar?: string;
}

interface ImagePreview {
  url: string;
  file: File;
}

const VolunteerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    role: "",
    fbLink: "",
    address: "",
    wardCode: "",
    avatar: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);

  // Location states
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

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex =
      /^(0|84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validateFacebookUrl = (url: string): boolean => {
    const fbRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+/i;
    return fbRegex.test(url);
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên tình nguyện viên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.role) {
      newErrors.role = "Vui lòng chọn chức vụ";
    }

    if (formData.fbLink && !validateFacebookUrl(formData.fbLink)) {
      newErrors.fbLink = "Đường dẫn Facebook không hợp lệ";
    }

    if (!formData.wardCode) {
      newErrors.wardCode = "Vui lòng chọn địa chỉ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
    }

    if (!imagePreview) {
      newErrors.avatar = "Vui lòng chọn ảnh đại diện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file ảnh");
        return;
      }

      setImagePreview({
        url: URL.createObjectURL(file),
        file,
      });
      setErrors((prev) => ({ ...prev, avatar: undefined }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let avatarUrl = "";
        if (imagePreview) {
          avatarUrl = (await firebaseApi.uploadImageToFirebase(
            imagePreview.file
          )) as string;
        }

        const submitData = {
          ...formData,
          avatar: avatarUrl,
        };

        console.log("Form data:", submitData);

        return true;
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Có lỗi xảy ra khi gửi form!");
        return false;
      }
    }

    toast.error("Vui lòng kiểm tra lại thông tin!");
    return false;
  };

  return (
    <form id="volunteer-form-id" onSubmit={onSubmit} className="space-y-6 px-6">
      {/* Name */}
      <div className="space-y-2">
        <Label>Tên tình nguyện viên</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={cn(errors.name && "border-red-500")}
          placeholder="Nhập tên tình nguyện viên"
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name}</span>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label>Số điện thoại</Label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={cn(errors.phone && "border-red-500")}
          placeholder="Nhập số điện thoại"
        />
        {errors.phone && (
          <span className="text-sm text-red-500">{errors.phone}</span>
        )}
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label>Chức vụ</Label>
        <Select onValueChange={(value) => handleSelectChange(value, "role")}>
          <SelectTrigger className={cn(errors.role && "border-red-500")}>
            <SelectValue placeholder="Chọn chức vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TNV_HOTLINE">
              Tình nguyện viên Hotline
            </SelectItem>
            <SelectItem value="TNV_XAC_MINH">
              Tình nguyện viên Xác minh
            </SelectItem>
            <SelectItem value="TNV_THU_THAP">
              Tình nguyện viên Thu thập
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <span className="text-sm text-red-500">{errors.role}</span>
        )}
      </div>

      {/* Facebook Link */}
      <div className="space-y-2">
        <Label>Đường dẫn Facebook của bạn</Label>
        <Input
          name="fbLink"
          value={formData.fbLink}
          onChange={handleInputChange}
          className={cn(errors.fbLink && "border-red-500")}
          placeholder="Nhập link Facebook của bạn"
        />
        {errors.fbLink && (
          <span className="text-sm text-red-500">{errors.fbLink}</span>
        )}
      </div>

      {/* Location */}
      <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
        <div className="space-y-4">
          {/* Province */}
          <div>
            <Label className="font-medium">Tỉnh/Thành phố</Label>
            <Select
              onValueChange={(value) => {
                setSelectedProvince(Number(value));
                handleSelectChange(`||${value}`, "wardCode");
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

          {/* District */}
          <div>
            <Label className=" font-medium">Quận/Huyện</Label>
            <Select
              disabled={!selectedProvince}
              onValueChange={(value) => {
                setSelectedDistrict(Number(value));
                handleSelectChange(`|${value}|${selectedProvince}`, "wardCode");
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

          {/* Ward */}
          <div>
            <Label className=" font-medium">Phường/Xã</Label>
            <Select
              disabled={!selectedDistrict}
              onValueChange={(value) => {
                handleSelectChange(
                  `${value}|${selectedDistrict}|${selectedProvince}`,
                  "wardCode"
                );
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

          {errors.wardCode && (
            <span className="text-sm text-red-500">{errors.wardCode}</span>
          )}

          {/* Specific Address */}
          <div>
            <Label className="font-medium">Địa chỉ cụ thể</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập số nhà, tên đường..."
              className={cn("mt-2", errors.address && "border-red-500")}
            />
            {errors.address && (
              <span className="text-sm text-red-500">{errors.address}</span>
            )}
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="space-y-2">
        <Label>Ảnh đại diện</Label>
        <div className="mt-2">
          {imagePreview ? (
            <div className="relative w-32 h-32">
              <img
                src={imagePreview.url}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="relative h-32 w-32 cursor-pointer rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-500">
                <Camera className="h-8 w-8" />
                <span className="text-sm">Thêm ảnh</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}
          {errors.avatar && (
            <span className="text-sm text-red-500 block mt-1">
              {errors.avatar}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default VolunteerForm;
