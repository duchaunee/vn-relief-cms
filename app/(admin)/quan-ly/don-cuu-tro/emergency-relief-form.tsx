"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Users } from "lucide-react";

export default function EmergencyReliefForm() {
  const [senderType, setSenderType] = useState("self");
  const [peopleCount, setPeopleCount] = useState(1);

  return (
    <form className="w-fit mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Người gửi thông tin?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="self" onValueChange={setSenderType}>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer">
                <RadioGroupItem value="self" id="self" className="sr-only" />
                <Label
                  htmlFor="self"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <User className="h-8 w-8 mb-2 text-blue-500" />
                  <span className="font-semibold">Tự gửi đơn cứu trợ</span>
                  <span className="text-sm text-gray-500">
                    Người trực tiếp cần được giúp đỡ
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 flex-1 cursor-pointer">
                <RadioGroupItem value="other" id="other" className="sr-only" />
                <Label
                  htmlFor="other"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Users className="h-8 w-8 mb-2 text-green-500" />
                  <span className="font-semibold">Gửi giúp tin cứu trợ</span>
                  <span className="text-sm text-gray-500">
                    Gửi thông tin giúp người khác
                  </span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề cứu trợ</Label>
              <Input
                id="title"
                placeholder="Ví dụ: Xin cứu giúp gia đình đang gặp nạn..."
              />
            </div>
            <div>
              <Label htmlFor="description">Mô tả tình trạng hiện tại</Label>
              <Textarea
                id="description"
                placeholder="Ví dụ: Nhà có 1 người già, 2 người lớn, 2 trẻ nhỏ đang ở trên gác, nước đang dâng cao..."
              />
            </div>
            <div>
              <Label htmlFor="content">Nội dung cứu trợ</Label>
              <Textarea
                id="content"
                placeholder="Ví dụ: Cần thực phẩm, nước uống, thuốc men..."
              />
            </div>
            <div>
              <Label>Số người cần hỗ trợ</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={peopleCount}
                  onChange={(e) =>
                    setPeopleCount(parseInt(e.target.value) || 1)
                  }
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPeopleCount(peopleCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Số điện thoại liên hệ</Label>
              <Input id="phone" placeholder="Nhập số điện thoại" />
            </div>
            <div>
              <Label htmlFor="priority-contact">Người ưu tiên liên hệ</Label>
              <Input
                id="priority-contact"
                placeholder="Nhập tên người cần cứu trợ"
              />
            </div>
            {senderType === "other" && (
              <div>
                <Label htmlFor="victim-phone">
                  Số điện thoại của người cần cứu trợ
                </Label>
                <Input
                  id="victim-phone"
                  placeholder="Nhập số điện thoại của người cần cứu trợ"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="province">Tỉnh/Thành phố</Label>
              <Select>
                <SelectTrigger id="province">
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                  {/* Add more provinces/cities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select>
                <SelectTrigger id="district">
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add districts based on selected province */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ward">Phường/Xã</Label>
              <Select>
                <SelectTrigger id="ward">
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add wards based on selected district */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Địa chỉ cụ thể</Label>
              <Input id="address" placeholder="Nhập số nhà, tên đường..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div>
            <Label htmlFor="images">Hình ảnh hiện trường</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Tải lên hình ảnh</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                    />
                  </label>
                  <p className="pl-1">hoặc kéo và thả</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF lên đến 10MB
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="w-full">
          Gửi yêu cầu cứu trợ
        </Button>
      </div>
    </form>
  );
}
