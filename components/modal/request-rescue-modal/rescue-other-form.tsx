"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  Camera,
  MapPin,
  QrCode,
  UserRound,
  Users,
  X,
} from "lucide-react";
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
import MinusIcon from "@/components/icon/minus-icon";
import PlusIcon from "@/components/icon/plus-icon";
import { useRequestReliefContext } from "@/providers/app-context-provider/request-relief-provider";

import dataLocation from "@/constants/location.json";
import { findProvinceByCode, transformData } from "@/utils/helper/common";
import firebaseApi from "@/configs/firebase/firebase.stogare";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import toast from "react-hot-toast";
import { RequestData } from "@/types/models/rescue-request";
import { RESCUE_REQUEST_ITEMS_APIS } from "@/apis/rescue-request-item";
import { RescueRequestItem } from "@/types/models/rescue-request-item";
import _ from "lodash";

const DRAFT_KEY = "rescue_request_draft";

const FormError = ({ message }: { message: string }) => (
  <span className="text-sm text-red-500 mt-1">{message}</span>
);

interface ValidationErrors {
  senderType?: string;
  title?: string;
  description?: string;
  numberOfPeopleNeedingHelp?: string;
  phone?: string;
  wardCode?: string;
  [key: string]: string | undefined; // For dynamic relief item errors
}
interface ImagePreview {
  url: string;
  file: File;
}

interface ReliefItem {
  name: string;
  quantity: string;
  unit: string;
}

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

export default function RescueRequestOtherForm() {
  const [formData, setFormData] = useState({
    type: "other",
    informantId: null,
    wardCode: "",
    description: "",
    title: "",
    contentNeedsRelief: "",
    phone: "",
    senderType: "Tự gửi đơn cứu trợ",
    priorityContact: "",
    priorityPhone: "",
    address: "",
    numberOfPeopleNeedingHelp: 1,
    verifierId: null,
    // requiredRescueTime: new Date().toISOString(),
    // currentLocation: {
    //   type: "Point",
    //   coordinates: [105.8342, 21.0285],
    // },
    status: {
      verify: "pending",
      recipient: "pending",
    },
  });

  // =====================
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
  // =====================

  const queryClient = useQueryClient();

  const { open, setOpen } = useRequestReliefContext();

  const [showMap, setShowMap] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.senderType)
      newErrors.senderType = "Vui lòng chọn loại người gửi";
    if (!formData.title) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.description)
      newErrors.description = "Vui lòng mô tả tình trạng";
    if (formData.numberOfPeopleNeedingHelp < 1) {
      newErrors.numberOfPeopleNeedingHelp = "Số người phải lớn hơn 0";
    }
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.wardCode) newErrors.wardCode = "Vui lòng chọn địa điểm";
    // if (!formData.contentNeedsRelief)
    //   newErrors.contentNeedsRelief = "Vui lòng nhập nội dung cần cứu trợ";

    reliefItems.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`itemName${index}`] = "Vui lòng nhập tên hàng";
      }

      if (!item.quantity.trim()) {
        newErrors[`itemQuantity${index}`] = "Vui lòng nhập số lượng";
      } else if (isNaN(Number(item.quantity)) || Number(item.quantity) <= 0) {
        newErrors[`itemQuantity${index}`] = "Số lượng phải là số dương";
      }

      if (!item.unit.trim()) {
        newErrors[`itemUnit${index}`] = "Vui lòng nhập đơn vị";
      }
    });

    console.log(
      "\n🔥 ~ file: rescue-other-form.tsx:171 ~ newErrors::\n",
      newErrors
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    if (name === "wardCode") {
      setErrors((prev) => ({
        ...prev,
        wardCode: undefined,
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (type: "increment" | "decrement") => {
    setFormData((prev) => ({
      ...prev,
      numberOfPeopleNeedingHelp:
        type === "increment"
          ? prev.numberOfPeopleNeedingHelp + 1
          : Math.max(0, prev.numberOfPeopleNeedingHelp - 1),
    }));
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
  //================================
  const [reliefItems, setReliefItems] = useState<RescueRequestItem[]>([
    {
      _id: "",
      rescueRequestId: "",
      name: "",
      quantity: "",
      remainingQuantity: "",
      unit: "",
      deletedAt: null,
      createdAt: null,
      updatedAt: null,
      __v: 0,
    },
  ]);

  //================================

  const saveRescueRequestItems = async (
    rescueRequestId: string,
    items: RescueRequestItem[]
  ) => {
    try {
      const formatItems = items.map((item) =>
        _.omit(item, ["_id", "deletedAt", "createdAt", "updatedAt", "__v"])
      );
      return await RESCUE_REQUEST_ITEMS_APIS.save(rescueRequestId, formatItems);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const updateRescueRequestMutation = useMutation({
    mutationFn: (body: RequestData) => RESCUE_REQUEST_APIS.save(body),
    onSuccess: async (data: any) => {
      if (data.statusCode == 201) {
        await saveRescueRequestItems(data.data.data._id, reliefItems);

        toast.success(data.data.message);
        setOpen(false);

        queryClient.setQueryData(["rescue-request-other"], (oldData: any) => ({
          data: [...oldData.data, data.data.data],
        }));
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const imageUrls = await handleImageUpload(
          imageFiles.map((img) => img.file)
        );

        const submitData = {
          mainFormData: {
            ...formData,
            images: imageUrls,
          },
          reliefItems: reliefItems,
        };
        console.log(
          "\n🔥 ~ file: rescue-other-form.tsx:262 ~ submitData::\n",
          submitData
        );

        await updateRescueRequestMutation.mutateAsync(
          submitData.mainFormData as any
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-5">
      <Card className={cn("mx-auto w-full border-none shadow-none")}>
        <CardContent className="p-0 border-none shadow-none">
          <form
            id="rescue-form-other-id"
            onSubmit={onSubmit}
            className="space-y-8"
          >
            {/* Assistance Type */}
            <div className="space-y-4 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Người gửi thông tin?
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Vui lòng chọn loại thông tin bạn muốn gửi
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="self-help"
                      name="senderType"
                      value="Tự gửi đơn cứu trợ"
                      checked={formData.senderType === "Tự gửi đơn cứu trợ"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="self-help"
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 bg-white p-6 text-center shadow-sm transition-all hover:bg-gray-50 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600"
                    >
                      <div className="rounded-full bg-blue-50 p-3">
                        <UserRound className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium peer-checked:text-blue-600">
                          Tự gửi đơn cứu trợ
                        </p>
                        <p className="text-sm text-gray-500">
                          Người trực tiếp cần được giúp đỡ
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="relative">
                    <input
                      type="radio"
                      id="help-others"
                      name="senderType"
                      value="Gửi giúp tin cứu trợ"
                      checked={formData.senderType === "Gửi giúp tin cứu trợ"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="help-others"
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 bg-white p-6 text-center shadow-sm transition-all hover:bg-gray-50 peer-checked:border-green-600 peer-checked:ring-1 peer-checked:ring-green-600"
                    >
                      <div className="rounded-full bg-green-50 p-3">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium peer-checked:text-green-600">
                          Gửi giúp tin cứu trợ
                        </p>
                        <p className="text-sm text-gray-500">
                          Gửi thông tin giúp người khác
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>
                {errors.senderType && <FormError message={errors.senderType} />}
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Tiêu đề cứu trợ
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Tiêu đề giúp các mạnh thường quân có thể hiểu khái quát được
                  nội dung
                </p>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={cn(errors.title && "border-red-500")}
                  placeholder="Ví dụ: Xin cứu giúp gia đình đang gặp nạn..."
                />
                {errors.title && <FormError message={errors.title} />}
              </div>

              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Mô tả tình trạng hiện tại
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Mô tả chi tiết về tình trạng của bạn để các mạnh thường quân
                  nắm bắt
                </p>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={cn(errors.description && "border-red-500")}
                  placeholder="Ví dụ: Nhà đang thiếu thức ăn trầm trọng, gia đình đã nhịn đói nhiều ngày, cần được..."
                  rows={4}
                />
                {errors.description && (
                  <FormError message={errors.description} />
                )}
              </div>

              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Nội dung hỗ trợ (ước lượng)
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Nhập các mặt hàng cần hỗ trợ, số lượng và đơn vị
                </p>

                <div className="space-y-4">
                  {reliefItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-fit">
                        <Input
                          placeholder="Tên hàng"
                          value={item.name}
                          onChange={(e) => {
                            const newItems = [...reliefItems];
                            newItems[index].name = e.target.value;
                            setReliefItems(newItems);
                            setErrors((prev) => ({
                              ...prev,
                              [`itemName${index}`]: undefined,
                            }));
                          }}
                          className={cn(
                            errors[`itemName${index}`] && "border-red-500"
                          )}
                        />
                        {errors[`itemName${index}`] && (
                          <span className="text-sm text-red-500 mt-1">
                            {errors[`itemName${index}`]}
                          </span>
                        )}
                      </div>

                      <div>
                        <Input
                          placeholder="Số lượng"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...reliefItems];
                            newItems[index].quantity = e.target.value;
                            setReliefItems(newItems);
                            setErrors((prev) => ({
                              ...prev,
                              [`itemQuantity${index}`]: undefined,
                            }));
                          }}
                          className={cn(
                            errors[`itemQuantity${index}`] && "border-red-500"
                          )}
                        />
                        {errors[`itemQuantity${index}`] && (
                          <span className="text-sm text-red-500 mt-1">
                            {errors[`itemQuantity${index}`]}
                          </span>
                        )}
                      </div>

                      <div>
                        <Input
                          placeholder="Đơn vị"
                          value={item.unit}
                          onChange={(e) => {
                            const newItems = [...reliefItems];
                            newItems[index].unit = e.target.value;
                            setReliefItems(newItems);
                            setErrors((prev) => ({
                              ...prev,
                              [`itemUnit${index}`]: undefined,
                            }));
                          }}
                          className={cn(
                            errors[`itemUnit${index}`] && "border-red-500"
                          )}
                        />
                        {errors[`itemUnit${index}`] && (
                          <span className="text-sm text-red-500 mt-1">
                            {errors[`itemUnit${index}`]}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newItems = reliefItems.filter(
                            (_, i) => i !== index
                          );
                          setReliefItems(newItems);
                          // Clear errors for removed item
                          const newErrors = { ...errors };
                          delete newErrors[`itemName${index}`];
                          delete newErrors[`itemQuantity${index}`];
                          delete newErrors[`itemUnit${index}`];
                          setErrors(newErrors);
                        }}
                        className="h-10 flex items-center justify-center bg-gray-100 text-center text-gray-900 text-sm p-4 hover:bg-gray-200 rounded-lg"
                      >
                        <MinusIcon />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReliefItems([
                            ...reliefItems,
                            { name: "", quantity: "", unit: "" },
                          ])
                        }
                        className="h-10 flex items-center justify-center bg-gray-100 text-center text-gray-900 text-sm p-4 hover:bg-gray-200 rounded-lg"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  ))}

                  {reliefItems.length === 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setReliefItems([{ name: "", quantity: "", unit: "" }])
                      }
                      className="h-10 flex items-center justify-center bg-gray-100 text-center text-gray-900 text-sm px-4 hover:bg-gray-200 rounded-lg"
                    >
                      <PlusIcon className="mr-2" /> Thêm hàng
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Số người cần hỗ trợ
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Nhập số lượng người cần được hỗ trợ (ước lượng)
                </p>
                <div className="flex items-center w-fit h-11 border rounded-lg overflow-hidden border-gray-300">
                  <button
                    type="button"
                    onClick={() => handleNumberChange("decrement")}
                    className="h-full flex items-center justify-center bg-gray-100 text-center text-gray-900 text-sm p-4 hover:bg-gray-200"
                  >
                    <MinusIcon />
                  </button>
                  <input
                    type="number"
                    value={formData.numberOfPeopleNeedingHelp}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData((prev) => ({
                        ...prev,
                        numberOfPeopleNeedingHelp: Math.max(0, value),
                      }));
                    }}
                    min={0}
                    className="block h-full text-center bg-white border-x border-x-gray-300 w-[100px] px-3"
                  />
                  <button
                    type="button"
                    onClick={() => handleNumberChange("increment")}
                    className="h-full flex items-center justify-center bg-gray-100 text-center text-gray-900 text-sm p-4 hover:bg-gray-200"
                  >
                    <PlusIcon />
                  </button>
                </div>
                {errors.numberOfPeopleNeedingHelp && (
                  <FormError message={errors.numberOfPeopleNeedingHelp} />
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-2">
                <RequiredLabel>
                  <Label className="text-base font-medium">
                    Số điện thoại liên hệ
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Số điện thoại để đội cứu trợ có thể liên lạc với bạn
                </p>
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

              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Người ưu tiên liên hệ
                </Label>
                <p className="text-sm text-gray-500">Tên người cần cứu trợ</p>
                <Input
                  name="priorityContact"
                  value={formData.priorityContact}
                  onChange={handleInputChange}
                  placeholder="Nhập tên người cần cứu trợ"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Số điện thoại của người cần cứu trợ
                </Label>
                <p className="text-sm text-gray-500">
                  Số điện thoại của người cần được hỗ trợ
                </p>
                <Input
                  name="priorityPhone"
                  value={formData.priorityPhone}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Nhập số điện thoại của người cần cứu trợ"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Tỉnh/Thành phố
                  </Label>
                  <Select
                    // value={formData.wardCode.split("|")[2] || ""}
                    onValueChange={(value) => {
                      setSelectedProvince(Number(value));
                      handleSelectChange(`||${value}`, "wardCode");
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "mt-2",
                        errors.wardCode && "border-red-500"
                      )}
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
                      handleSelectChange(
                        `|${value}|${selectedProvince}`,
                        "wardCode"
                      );
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "mt-2",
                        errors.wardCode && "border-red-500"
                      )}
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
                      handleSelectChange(
                        `${value}|${selectedDistrict}|${selectedProvince}`,
                        "wardCode"
                      );
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "mt-2",
                        errors.wardCode && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem
                          key={ward.code}
                          value={ward.code.toString()}
                        >
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {errors.wardCode && <FormError message={errors.wardCode} />}

                <div>
                  <Label className="text-base font-medium">
                    Địa chỉ cụ thể
                  </Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập số nhà, tên đường..."
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Additional Info and Images */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Hình ảnh hiện trường
                </Label>
                <p className="text-sm text-gray-500">
                  Tải lên hình ảnh để đội cứu trợ nắm rõ tình hình
                </p>
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
