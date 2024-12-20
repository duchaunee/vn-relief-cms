"use client";

import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const provinces = [
  {
    id: 1,
    name: "Tỉnh Hà Giang",
    zalo: "",
    hotline: "02193.867.633",
  },
  {
    id: 2,
    name: "Tỉnh Cao Bằng",
    zalo: "",
    hotline: "02063 853 618",
  },
  {
    id: 3,
    name: "Tỉnh Bắc Kạn",
    zalo: "",
    hotline: "02093.870.655",
  },
  {
    id: 4,
    name: "Tỉnh Tuyên Quang",
    zalo: "",
    hotline: "0207382375",
  },
  {
    id: 5,
    name: "Tỉnh Lào Cai",
    zalo: "",
    hotline: "0214382018",
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter provinces based on search
  const filteredProvinces = provinces.filter(
    (province) =>
      province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      province.hotline.includes(searchTerm)
  );

  const ProvinceCard = ({ province }) => (
    <Card className="mb-4 shadow-none rounded-md border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              width={60}
              height={60}
              alt={province.name}
              src="https://lh3.googleusercontent.com/d/1o0apz2p5VWQBPbcFXLoh0KxZQV4es22H"
              className="rounded-full"
            />
            <div>
              <h3 className="text-base font-medium text-[#18181b]">
                {province.name}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-blue-500">
                  Đường dây nóng: {province.hotline}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {/* <Dialog
              open={isEditDialogOpen && selectedProvince?.id === province.id}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedProvince(province);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa thông tin tỉnh</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label>Tên tỉnh</label>
                    <Input defaultValue={selectedProvince?.name} />
                  </div>
                  <div className="space-y-2">
                    <label>Đường dây nóng</label>
                    <Input defaultValue={selectedProvince?.hotline} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button onClick={() => setIsEditDialogOpen(false)}>
                      Lưu
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isDeleteDialogOpen && selectedProvince?.id === province.id}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedProvince(province);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Xác nhận xóa</DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn xóa thông tin của {province.name}?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 py-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Xóa
                  </Button>
                </div>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative container mx-auto px-4 max-w-2xl">
      <div className="sticky top-[105px] pt-6 pb-4 left-0 z-10 bg-background">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên tỉnh hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 h-auto bg-white"
            />
          </div>

          {/* <Dialog open={isAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm tỉnh mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Tên tỉnh</label>
                <Input placeholder="Nhập tên tỉnh..." />
              </div>
              <div className="space-y-2">
                <label>Đường dây nóng</label>
                <Input placeholder="Nhập số điện thoại..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Thêm</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog> */}
        </div>
      </div>

      <div>
        {[...filteredProvinces, ...filteredProvinces, ...filteredProvinces].map(
          (province) => (
            <ProvinceCard key={province.id} province={province} />
          )
        )}
      </div>
    </div>
  );
};

export default Page;
