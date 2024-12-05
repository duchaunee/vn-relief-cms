"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Camera,
  MapPin,
  Minus,
  Plus,
  QrCode,
  UserRound,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function RescueRequestForm() {
  const [formData, setFormData] = useState({
    id: "KHANCAP146",
    assistanceType: "person-in-need",
    submissionTime: "12/05/2024 11:56:20 AM",
    currentStatus: "",
    numberOfPeople: 0,
    contactNumber: "",
    location: "0.000000, 0.000000",
    additionalDetails: "",
    region: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full bg-gray-5">
      <Card className={cn("mx-auto w-full border-none shadow-none")}>
        <CardContent className="p-0 border-none shadow-none">
          <form id="rescue-form-id" onSubmit={onSubmit} className="space-y-8">
            {/* ID Section */}
            <div className="space-y-4 rounded-lg border border-gray-300 bg-white p-6">
              <div className="space-y-2">
                <RequiredLabel>
                  <Label htmlFor="id" className="text-base font-medium">
                    ID đơn cứu trợ
                  </Label>
                </RequiredLabel>
                <p className="text-sm text-gray-500">
                  Chia sẻ kèm ID khi lan truyền để kiểm tra tại vnrelief.com
                </p>
                <Input
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              </div>
            </div>

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
                      id="person-in-need"
                      name="assistanceType"
                      value="person-in-need"
                      checked={formData.assistanceType === "person-in-need"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="person-in-need"
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
                      id="assistance-info"
                      name="assistanceType"
                      value="assistance-info"
                      checked={formData.assistanceType === "assistance-info"}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="assistance-info"
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
              </div>
            </div>

            {/* Time, Status, People Section */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              {/* Timestamp */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Thời gian gửi tin cần cứu trợ
                </Label>
                <p className="text-sm text-gray-500">
                  Thời gian hệ thống ghi nhận yêu cầu của bạn
                </p>
                <div className="relative mt-2">
                  <Input
                    name="submissionTime"
                    value={formData.submissionTime}
                    type="text"
                    className="pl-10 bg-gray-50"
                    readOnly
                  />
                  <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>

              {/* Current Status */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Mô tả tình trạng hiện tại
                </Label>
                <p className="text-sm text-gray-500">
                  Mô tả chi tiết về tình trạng nơi thiên tai để đội cứu hộ nắm
                  bắt
                </p>
                <Textarea
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Nhà có 1 người già, 2 người lớn, 2 trẻ nhỏ đang ở trên gác, nước đang dâng cao..."
                  className="mt-2 resize-none"
                  rows={4}
                />
              </div>

              {/* Number of People */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Số người cần hỗ trợ
                </Label>
                <p className="text-sm text-gray-500">
                  Nhập số lượng người cần được hỗ trợ (ước lượng)
                </p>
                <div className="flex items-center w-fit h-11 border rounded-lg overflow-hidden border-gray-300">
                  <button
                    onClick={() => {}}
                    className="h-full flex items-center justify-center bg-gray-100 border border-gray-300 text-center text-gray-900 text-sm p-4 hover:bg-gray-200"
                  >
                    <MinusIcon />
                  </button>
                  <input
                    type="number"
                    defaultValue="1"
                    min={0}
                    className="block h-full text-center bg-white border-x border-x-gray-300 w-[100px] px-3"
                  />
                  <button
                    onClick={() => {}}
                    className="h-full flex items-center justify-center bg-gray-100 border border-gray-300 text-center text-gray-900 text-sm p-4 hover:bg-gray-200"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact and Location Section */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              {/* Contact Information */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Số điện thoại liên hệ
                </Label>
                <p className="text-sm text-gray-500">
                  Số điện thoại để đội cứu trợ có thể liên lạc với bạn
                </p>
                <Input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="mt-2"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Địa điểm cần hỗ trợ
                </Label>
                <p className="text-sm text-gray-500">
                  Vui lòng cung cấp địa chỉ chính xác để đội cứu trợ có thể tìm
                  đến
                </p>
                <div className="relative mt-2">
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Nhập địa chỉ hoặc chọn trên bản đồ"
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
                <div className="h-[300px] rounded-lg border bg-gray-100 mt-4">
                  <div className="flex h-full items-center justify-center text-gray-500">
                    Map Integration
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              {/* Additional Information */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Thông tin bổ sung
                </Label>
                <p className="text-sm text-gray-500">
                  Các thông tin khác cần chia sẻ với đội cứu trợ
                </p>
                <Textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  placeholder="Nhập thông tin bổ sung (nếu có)"
                  className="mt-2 resize-none"
                  rows={4}
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Hình ảnh hiện trường
                </Label>
                <p className="text-sm text-gray-500">
                  Tải lên hình ảnh để đội cứu trợ nắm rõ tình hình
                </p>
                <div className="grid gap-4 mt-2">
                  <div className="relative aspect-video cursor-pointer rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-500">
                      <Camera className="h-8 w-8" />
                      <span>Bấm để tải ảnh lên</span>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0"
                      multiple
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              {/* Region Selection */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Khu vực</Label>
                <p className="text-sm text-gray-500">
                  Chọn khu vực địa lý để phân loại yêu cầu
                </p>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleSelectChange(value, "region")}
                  className="mt-2"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khu vực" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">Miền Bắc</SelectItem>
                    <SelectItem value="central">Miền Trung</SelectItem>
                    <SelectItem value="south">Miền Nam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Share Section */}
            <div className="space-y-6 rounded-lg border border-gray-300 bg-white p-6">
              {/* QR Code */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Mã QR chia sẻ</Label>
                <p className="text-sm text-gray-500">
                  Quét mã QR để chia sẻ thông tin này
                </p>
                <div className="flex justify-center rounded-lg border bg-white p-4 mt-2">
                  <QrCode className="h-32 w-32" />
                </div>
              </div>

              {/* Share Template */}
              <div className="space-y-2">
                <p className="text-base font-medium">Mẫu chia sẻ</p>
                <p className="text-sm text-gray-500">
                  Copy nội dung bên dưới để chia sẻ
                </p>
                <div className="rounded-lg bg-gray-50 p-4 mt-2">
                  <div className="space-y-2 text-sm">
                    <div className="space-y-1 text-gray-600">
                      <p>📍 ID: {formData.id}</p>
                      <p>✅ Trạng thái: Chờ xác minh</p>
                      <p>🗺️ Khu vực: {formData.region || "Chưa chọn"}</p>
                      <p>
                        📝 Chi tiết:{" "}
                        {formData.additionalDetails || "Chưa cung cấp"}
                      </p>
                      <p>
                        📞 Liên hệ: {formData.contactNumber || "Chưa cung cấp"}
                      </p>
                      <p>🕒 Cập nhật: {formData.submissionTime}</p>
                    </div>
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
