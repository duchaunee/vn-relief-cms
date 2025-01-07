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
  { id: 1, name: "Tỉnh Hà Giang", zalo: "", hotline: "02193.867.633" },
  { id: 2, name: "Tỉnh Cao Bằng", zalo: "", hotline: "02063 853 618" },
  { id: 3, name: "Tỉnh Bắc Kạn", zalo: "", hotline: "02093.870.655" },
  { id: 4, name: "Tỉnh Tuyên Quang", zalo: "", hotline: "0207382375" },
  { id: 5, name: "Tỉnh Lào Cai", zalo: "", hotline: "0214382018" },
  { id: 6, name: "Tỉnh Yên Bái", zalo: "", hotline: "0216385528" },
  { id: 7, name: "Tỉnh Thái Nguyên", zalo: "", hotline: "02083.856.899" },
  { id: 8, name: "Tỉnh Lạng Sơn", zalo: "", hotline: "02053.871.234" },
  { id: 9, name: "Tỉnh Quảng Ninh", zalo: "", hotline: "02033.813.666" },
  { id: 10, name: "Tỉnh Bắc Giang", zalo: "", hotline: "02043.869.700" },
  { id: 11, name: "Tỉnh Phú Thọ", zalo: "", hotline: "02103.855.568" },
  { id: 12, name: "Tỉnh Vĩnh Phúc", zalo: "", hotline: "02113.849.321" },
  { id: 13, name: "Tỉnh Bắc Ninh", zalo: "", hotline: "02223.879.768" },
  { id: 14, name: "Tỉnh Hải Dương", zalo: "", hotline: "02203.877.556" },
  { id: 15, name: "Tỉnh Hưng Yên", zalo: "", hotline: "02213.856.430" },
  { id: 16, name: "Tỉnh Thái Bình", zalo: "", hotline: "02273.859.217" },
  { id: 17, name: "Tỉnh Nam Định", zalo: "", hotline: "02283.847.000" },
  { id: 18, name: "Tỉnh Hà Nam", zalo: "", hotline: "02263.854.555" },
  { id: 19, name: "Tỉnh Ninh Bình", zalo: "", hotline: "02293.877.778" },
  { id: 20, name: "Tỉnh Thanh Hóa", zalo: "", hotline: "02373.850.999" },
  { id: 21, name: "Tỉnh Nghệ An", zalo: "", hotline: "02383.857.111" },
  { id: 22, name: "Tỉnh Hà Tĩnh", zalo: "", hotline: "02393.879.555" },
  { id: 23, name: "Tỉnh Quảng Bình", zalo: "", hotline: "02323.851.234" },
  { id: 24, name: "Tỉnh Quảng Trị", zalo: "", hotline: "02333.852.222" },
  { id: 25, name: "Tỉnh Thừa Thiên Huế", zalo: "", hotline: "02343.877.666" },
  { id: 26, name: "Tỉnh Đà Nẵng", zalo: "", hotline: "02363.888.999" },
  { id: 27, name: "Tỉnh Quảng Nam", zalo: "", hotline: "02353.870.555" },
  { id: 28, name: "Tỉnh Quảng Ngãi", zalo: "", hotline: "02553.856.432" },
  { id: 29, name: "Tỉnh Bình Định", zalo: "", hotline: "02563.850.765" },
  { id: 30, name: "Tỉnh Phú Yên", zalo: "", hotline: "02573.856.200" },
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
    <a href={`tel:${province.hotline}`}>
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
    </a>
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
        {filteredProvinces.map((province) => (
          <ProvinceCard key={province.id} province={province} />
        ))}
      </div>
    </div>
  );
};

export default Page;
