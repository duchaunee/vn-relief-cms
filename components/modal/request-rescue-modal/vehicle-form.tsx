"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dataLocation from "@/constants/location.json";
import { findProvinceByCode } from "@/utils/helper/common";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VEHICLE_APIS } from "@/apis/vehicle";
import { getCurrentUser } from "@/lib/axios";
import { getNaturalDisasterFromCookies } from "@/utils/auth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";

interface FormData {
  phone: string;
  licensePlate: string;
  vehicleType: string;
  supportCapability: string;
  quantity: number;
  status: string;
  wardCode: string;
}

export default function VehicleForm() {
  const user = getCurrentUser();

  const [formData, setFormData] = React.useState<FormData>({
    phone: "",
    licensePlate: "",
    vehicleType: "",
    supportCapability: "",
    quantity: 0,
    status: "active",
    wardCode: "",
  });

  // Location states
  const [provinces, setProvinces] = React.useState(dataLocation);
  const [selectedProvince, setSelectedProvince] = React.useState<number | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = React.useState<number | null>(
    null
  );
  const [districts, setDistricts] = React.useState<any[]>([]);
  const [wards, setWards] = React.useState<any[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
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

  React.useEffect(() => {
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
    const newErrors: { [key: string]: string } = {};

    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!formData.licensePlate) {
      newErrors.licensePlate = "Vui lòng nhập biển số xe";
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vui lòng chọn loại phương tiện";
    }

    if (!formData.wardCode) {
      newErrors.wardCode = "Vui lòng chọn địa chỉ";
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Vui lòng nhập số lượng hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const queryClient = useQueryClient();
  const { setOpen } = useRequestReliefContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const vehicleData = {
        ownerId: user,
        rescueTeamId: null,
        naturalDisasterId: getNaturalDisasterFromCookies()?._id,
        ...formData,
      };
      const createVehicle = await VEHICLE_APIS.save(vehicleData);

      queryClient.setQueryData(["vehicles"], (oldData: any) => ({
        data: [...oldData.data, createVehicle.data.data],
      }));

      setOpen(false);
      toast.success("Đăng ký phương tiện thành công !");
    }
  };

  return (
    <form
      id="vehicle-form-id"
      onSubmit={handleSubmit}
      className="space-y-8 bg-white"
    >
      <div className="space-y-6">
        {/* Phone */}
        <div className="space-y-2">
          <Label>Số điện thoại</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className={cn(errors.phone && "border-red-500")}
            placeholder="0123456789"
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone}</span>
          )}
        </div>

        {/* License Plate */}
        <div className="space-y-2">
          <Label>Biển số xe</Label>
          <Input
            name="licensePlate"
            value={formData.licensePlate}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                licensePlate: e.target.value,
              }))
            }
            className={cn(errors.licensePlate && "border-red-500")}
            placeholder="43A-12345"
          />
          {errors.licensePlate && (
            <span className="text-sm text-red-500">{errors.licensePlate}</span>
          )}
        </div>

        {/* Vehicle Type */}
        <div className="space-y-2">
          <Label>Loại phương tiện</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, vehicleType: value }))
            }
          >
            <SelectTrigger
              className={cn(errors.vehicleType && "border-red-500")}
            >
              <SelectValue placeholder="Chọn loại phương tiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Ô tô</SelectItem>
              <SelectItem value="motorboat">Xuồng máy</SelectItem>
              <SelectItem value="boat">Thuyền</SelectItem>
              <SelectItem value="other">Khác</SelectItem>
            </SelectContent>
          </Select>
          {errors.vehicleType && (
            <span className="text-sm text-red-500">{errors.vehicleType}</span>
          )}
        </div>

        {/* Support Capability */}
        <div className="space-y-2">
          <Label>Khả năng hỗ trợ</Label>
          <Textarea
            value={formData.supportCapability}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                supportCapability: e.target.value,
              }))
            }
            placeholder="Mô tả khả năng hỗ trợ của phương tiện"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Số lượng có thể cung cấp</Label>
          <p className="text-[12px] text-gray-500 italic">
            Điền nếu bạn đang khai báo cho mươn xuồng, ca nô, áo phao,...
          </p>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quantity: parseInt(e.target.value),
              }))
            }
            className={cn(errors.quantity && "border-red-500")}
            min="1"
          />
          {errors.quantity && (
            <span className="text-sm text-red-500">{errors.quantity}</span>
          )}
        </div>

        {/* Location */}
        <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
          <div className="space-y-4">
            <h2 className="text-base font-semibold">Vị trí phương tiện</h2>

            {/* Province */}
            <div>
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
                  className={cn(errors.wardCode && "border-red-500")}
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
                  className={cn(errors.wardCode && "border-red-500")}
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
                  className={cn(errors.wardCode && "border-red-500")}
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
          </div>
        </div>
      </div>
    </form>
  );
}
