import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";
import { getCurrentUser } from "@/lib/axios";

interface FormData {
  teamName: string;
  naturalDisasterId: string;
  operationType: string;
  phone: string;
  supportCapability: string;
  wardCode: string;
  status: string;
}

interface ValidationErrors {
  teamName?: string;
  operationType?: string;
  phone?: string;
  supportCapability?: string;
  wardCode?: string;
}

const RescueTeamForm = () => {
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    naturalDisasterId: "6764508ab85460f14f0b1d69", // Fixed value
    operationType: "",
    phone: "",
    supportCapability: "",
    wardCode: "01|23|34", // Fixed value
    status: "deactive", // Fixed value
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validatePhoneNumber = (phone: string): boolean => {
    // Kiểm tra số điện thoại Việt Nam
    const phoneRegex =
      /^(0|84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = "Vui lòng nhập tên đội cứu trợ";
    }

    if (!formData.operationType.trim()) {
      newErrors.operationType = "Vui lòng chọn loại hoạt động";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.supportCapability.trim()) {
      newErrors.supportCapability = "Vui lòng nhập khả năng hỗ trợ";
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

  const handleSelectChange = (value: string) => {
    setErrors((prev) => ({ ...prev, operationType: undefined }));
    setFormData((prev) => ({ ...prev, operationType: value }));
  };

  const { open, setOpen } = useRequestReliefContext();
  const queryClient = useQueryClient();
  const user = getCurrentUser();

  const createRescueTeamMutation = useMutation({
    mutationFn: (body: any) =>
      RESCUE_TEAMS_APIS.save({ userId: user._id, ...body }),
    onSuccess: async (data: any) => {
      console.log("\n🔥 ~ file: rescue-team-form.tsx:103 ~ data::\n", data);
      if (data.statusCode == 201) {
        toast.success(
          "Đăng ký thành công, vui lòng liên hệ Tình nguyện viên để duyệt !"
        );
        setOpen(false);
        // queryClient.setQueryData(["rescue-team"], (oldData: any) => {
        //   console.log(
        //     "\n🔥 ~ file: rescue-team-form.tsx:104 ~ oldData::\n",
        //     oldData
        //   );
        //   return {
        //     data: [...oldData.data, data.data.data],
        //   };
        // });
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // console.log("Form data:", formData); // Data sẽ submit
      await createRescueTeamMutation.mutateAsync({
        ...formData,
        status: "deactive",
      });
      return true;
    }

    toast.error("Vui lòng kiểm tra lại thông tin!");
    return false;
  };

  return (
    <form id="rescue-team-id" onSubmit={onSubmit} className="space-y-6 px-4">
      {/* Team Name */}
      <div className="space-y-2">
        <Label>Tên đội cứu trợ</Label>
        <Input
          name="teamName"
          value={formData.teamName}
          onChange={handleInputChange}
          className={cn(errors.teamName && "border-red-500")}
          placeholder="Nhập tên đội cứu trợ"
        />
        {errors.teamName && (
          <span className="text-sm text-red-500">{errors.teamName}</span>
        )}
      </div>

      {/* Operation Type */}
      <div className="space-y-2">
        <Label>Loại hoạt động</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger
            className={cn(errors.operationType && "border-red-500")}
          >
            <SelectValue placeholder="Chọn loại hoạt động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cứu hộ và di dời">Cứu hộ và di dời</SelectItem>
            <SelectItem value="Y tế khẩn cấp">Y tế khẩn cấp</SelectItem>
            <SelectItem value="Cung cấp lương thực">
              Cung cấp lương thực
            </SelectItem>
            <SelectItem value="Khác">Khác</SelectItem>
          </SelectContent>
        </Select>
        {errors.operationType && (
          <span className="text-sm text-red-500">{errors.operationType}</span>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label>Số điện thoại liên hệ</Label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={cn(errors.phone && "border-red-500")}
          placeholder="Nhập số điện thoại liên hệ"
        />
        {errors.phone && (
          <span className="text-sm text-red-500">{errors.phone}</span>
        )}
      </div>

      {/* Support Capability */}
      <div className="space-y-2">
        <Label>Khả năng hỗ trợ</Label>
        <Textarea
          name="supportCapability"
          value={formData.supportCapability}
          onChange={handleInputChange}
          className={cn(errors.supportCapability && "border-red-500")}
          placeholder="Mô tả khả năng hỗ trợ của đội"
          rows={4}
        />
        {errors.supportCapability && (
          <span className="text-sm text-red-500">
            {errors.supportCapability}
          </span>
        )}
      </div>
    </form>
  );
};

export default RescueTeamForm;
