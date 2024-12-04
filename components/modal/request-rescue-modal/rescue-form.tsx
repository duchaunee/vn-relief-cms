"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Camera, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Image from "next/image";

export default function RescueRequestForm() {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState<Date>();

  return (
    <div className="max-w-2xl overflow-y-auto">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label>
            Id của thông tin, chia sẻ kèm id khi lan truyền để kiểm tra tại
            cuutromientrung.com*
          </Label>
          <Input placeholder="KHANCAP146" />
        </div>

        <div className="space-y-2">
          <Label>Người gửi thông tin?*</Label>
          <RadioGroup
            defaultValue="receiver"
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="receiver" id="receiver" />
              <Label htmlFor="receiver">Người cần được cứu</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="helper" id="helper" />
              <Label htmlFor="helper">Gửi giúp tin kêu cứu</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Thời gian gửi tin cần cứu trợ*</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "12/05/2024 01:04:33 AM"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Mô tả tình trạng hiện tại*</Label>
          <Textarea className="min-h-[100px]" />
        </div>

        <div className="space-y-2">
          <Label>Nội dung cần cứu trợ</Label>
          <Textarea className="min-h-[100px]" />
        </div>

        <div className="space-y-2">
          <Label>Khu vực cần cứu trợ</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tìm kiếm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location1">Khu vực 1</SelectItem>
              <SelectItem value="location2">Khu vực 2</SelectItem>
              <SelectItem value="location3">Khu vực 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Số lượng người cần cứu trợ</Label>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setCount(Math.max(0, count - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{count}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setCount(count + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>SĐT liên lạc*</Label>
          <Input type="tel" />
        </div>

        <div className="space-y-2">
          <Label>Link dẫn kèm IT chi tiết</Label>
          <Input type="url" placeholder="http://" />
        </div>

        <div className="space-y-2">
          <Label>Người xác nhận thông tin*</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn người xác nhận" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verifier1">Người xác nhận 1</SelectItem>
              <SelectItem value="verifier2">Người xác nhận 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tọa độ vị trí cần cứu trợ</Label>
          <div className="border rounded-md p-2">
            <div className="flex gap-2 mb-2">
              <Button variant="outline" size="sm">
                Map
              </Button>
              <Button variant="outline" size="sm">
                Satellite
              </Button>
            </div>
            <div className="aspect-video bg-slate-100 rounded-md relative">
              {/* Google Maps would be integrated here */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Google Maps Integration
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Chụp hình hoàn cảnh hiện tại</Label>
          <div className="border-2 border-dashed rounded-md p-8 text-center">
            <Button variant="outline" className="mx-auto">
              <Camera className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Link chia sẻ thông tin (Nhấn giữ link để Copy)</Label>
          <Input
            value="https://thongtin.cuutromientrung.com/KHANCAP146"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label>Mã QR Chia sẻ thông tin</Label>
          <div className="border rounded-md p-4">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="QR Code"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Nhắn tin qua Zalo 092.92.92.119 Nhóm Đoàn Kết Việt Nam nếu bạn nắm
          tình hình cập nhật thông tin cứu trợ này
        </div>
      </form>
    </div>
  );
}
