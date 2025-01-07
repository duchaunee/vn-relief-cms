import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib/axios";

interface UserFormData {
  name: string;
  phone: string;
  fbLink: string;
  wardCode: string;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  fbLink?: string;
  wardCode?: string;
}

const FormError = ({ message }: { message: string }) => (
  <span className="text-sm text-red-500 mt-1">{message}</span>
);

export default function UserForm() {
  const user = getCurrentUser();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    phone: "",
    fbLink: "",
    wardCode: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Location state
  const [provinces] = useState(dataLocation);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        fbLink: user.fbLink || "",
        wardCode: user.wardCode || "",
      });

      // Parse location from wardCode
      if (user.wardCode) {
        const [wardStr, districtStr, provinceStr] = user.wardCode.split("|");
        const province = parseInt(provinceStr);
        const district = parseInt(districtStr);
        const ward = parseInt(wardStr);

        if (!isNaN(province)) {
          setSelectedProvince(province);
          const provinceData = findProvinceByCode(province);
          console.log(
            "\n🔥 ~ file: tab-account.tsx:76 ~ provinceData::\n",
            provinceData
          );
          if (provinceData) {
            setDistricts(provinceData.code);

            if (!isNaN(district)) {
              setSelectedDistrict(district);
              const districtData = provinceData.districts.find(
                (d) => d.code === district
              );
              if (districtData) {
                setWards(districtData.code);

                if (!isNaN(ward)) {
                  setSelectedWard(ward);
                }
              }
            }
          }
        }
      }
    }
  }, []);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const province = findProvinceByCode(selectedProvince);
      if (province) {
        setDistricts(province.districts);
        // Clear subordinate selections
        if (!selectedDistrict) {
          setWards([]);
        }
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  // Update wards when district changes
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

    if (!formData.name.trim()) {
      newErrors.name = "Họ tên không được để trống";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^(?:\+84|0)[0-9]{9,10}$/.test(formData.phone)) {
      newErrors.phone =
        "Số điện thoại không hợp lệ (có thể bắt đầu bằng +84 hoặc 0)";
    }

    if (
      formData.fbLink.trim() &&
      !/^https?:\/\/(www\.)?facebook\.com/.test(formData.fbLink)
    ) {
      newErrors.fbLink = "Link Facebook nên bắt đầu bằng https://facebook.com";
    }

    if (!formData.wardCode.trim()) {
      newErrors.wardCode = "Vui lòng chọn địa điểm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Here you would typically update the user data through an API
        console.log("Updating user data:", formData);
        toast.success("Đã cập nhật thông tin thành công");
      } catch (error) {
        console.error("Error updating user info:", error);
        toast.error("Có lỗi xảy ra khi cập nhật thông tin");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
    }
  };

  return (
    <Card className="mx-auto w-full border-none shadow-none">
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">Họ và tên</Label>
            </RequiredLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(errors.name && "border-red-500")}
              placeholder="Nhập họ và tên"
            />
            {errors.name && <FormError message={errors.name} />}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <RequiredLabel>
              <Label className="text-base font-medium">Số điện thoại</Label>
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

          {/* Facebook Link */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Link Facebook</Label>
            <Input
              name="fbLink"
              value={formData.fbLink}
              onChange={handleInputChange}
              className={cn(errors.fbLink && "border-red-500")}
              placeholder="https://facebook.com/username"
            />
            {errors.fbLink && <FormError message={errors.fbLink} />}
          </div>

          <button
            type="submit"
            className="w-fit bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Cập nhật thông tin
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
