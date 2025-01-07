import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RequiredLabel } from "@/components/require-field/require-label";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib/axios";
import { USER_APIS } from "@/apis/user";
import { useQueryClient } from "@tanstack/react-query";

interface UserFormData {
  name: string;
  phone: string;
  fbLink: string;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  fbLink?: string;
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
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        fbLink: user.fbLink || "",
      });
    }
  }, []);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await USER_APIS.update(user?._id, formData);
        // queryClient.refetchQueries()
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
