import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

// Dữ liệu mẫu
const danhSachDiemTapKet = [
  {
    id: 1,
    name: "Điểm tập kết 1",
    address: "123 Đường ABC, Quận X, TP HCM",
    currentSituation: "Tình hình ổn định",
    supportAbility: "Có khả năng hỗ trợ 100 người",
    locationType: "warehouse",
    phone: "0912316304",
    description: "Đây là điểm tập kết chính của thành phố",
    capacity: "500",
    images: [],
    wardId: "123456",
  },
  {
    id: 2,
    name: "Điểm tập kết 2",
    address: "456 Đường DEF, Quận Y, TP HCM",
    currentSituation: "Tình hình căng thẳng",
    supportAbility: "Có khả năng hỗ trợ 50 người",
    locationType: "school",
    phone: "0987654321",
    description: "Điểm tập kết này đang quá tải",
    capacity: "250",
    images: [],
    wardId: "654321",
  },
];

export default function WarehouseDashboard() {
  const [danhSachKho, setDanhSachKho] = useState(danhSachDiemTapKet);
  const [isThemKhoOpen, setIsThemKhoOpen] = useState(false);
  const [isXemKhoOpen, setIsXemKhoOpen] = useState(false);
  const [isCapNhatKhoOpen, setIsCapNhatKhoOpen] = useState(false);
  const [selectedKho, setSelectedKho] = useState(null);
  const [newKho, setNewKho] = useState({
    name: "",
    address: "",
    currentSituation: "",
    supportAbility: "",
    locationType: "warehouse",
    phone: "",
    description: "",
    capacity: "",
    images: [],
    wardId: "",
  });

  const handleThemKho = () => {
    const newKhoData = {
      id: danhSachKho.length + 1,
      ...newKho,
    };
    setDanhSachKho([...danhSachKho, newKhoData]);
    setNewKho({
      name: "",
      address: "",
      currentSituation: "",
      supportAbility: "",
      locationType: "warehouse",
      phone: "",
      description: "",
      capacity: "",
      images: [],
      wardId: "",
    });
    setIsThemKhoOpen(false);
    toast.success("Thêm kho thành công!");
  };

  const handleXemKho = (kho) => {
    setSelectedKho(kho);
    setIsXemKhoOpen(true);
  };

  const handleCapNhatKho = (kho) => {
    setSelectedKho(kho);
    setIsCapNhatKhoOpen(true);
  };

  const handleCapNhatSubmit = () => {
    setDanhSachKho(
      danhSachKho.map((kho) =>
        kho.id === selectedKho.id ? { ...kho, ...selectedKho } : kho
      )
    );
    setIsCapNhatKhoOpen(false);
    toast.success("Cập nhật kho thành công!");
  };

  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Quản lý kho</span>
            {/* Dialog Thêm Kho */}
            <Dialog open={isThemKhoOpen} onOpenChange={setIsThemKhoOpen}>
              <DialogTrigger asChild>
                <Button>Thêm kho</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm kho mới</DialogTitle>
                  <DialogDescription>
                    Nhập thông tin của kho mới
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Tên kho
                    </label>
                    <Input
                      id="name"
                      value={newKho.name}
                      className="col-span-3"
                      onChange={(e) =>
                        setNewKho({ ...newKho, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="address" className="text-right">
                      Địa chỉ
                    </label>
                    <Input
                      id="address"
                      value={newKho.address}
                      className="col-span-3"
                      onChange={(e) =>
                        setNewKho({ ...newKho, address: e.target.value })
                      }
                    />
                  </div>
                  {/* các trường thông tin khác của kho */}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsThemKhoOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button onClick={handleThemKho}>Thêm kho</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên kho</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {danhSachKho.map((kho) => (
                <TableRow key={kho.id}>
                  <TableCell>{kho.name}</TableCell>
                  <TableCell>{kho.address}</TableCell>
                  <TableCell className="text-right">
                    <Button.Group>
                      {/* Dialog Xem Kho */}
                      <Dialog
                        open={isXemKhoOpen}
                        onOpenChange={setIsXemKhoOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => handleXemKho(kho)}
                          >
                            Xem kho
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Thông tin kho</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>
                              <span className="font-semibold">Tên kho: </span>
                              {selectedKho?.name}
                            </p>
                            <p>
                              <span className="font-semibold">Địa chỉ: </span>
                              {selectedKho?.address}
                            </p>
                            {/* hiển thị các thông tin khác */}
                          </div>
                          <DialogFooter>
                            <Button onClick={() => setIsXemKhoOpen(false)}>
                              Đóng
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Dialog Cập nhật kho */}
                      <Dialog
                        open={isCapNhatKhoOpen}
                        onOpenChange={setIsCapNhatKhoOpen}
                      >
                        <DialogTrigger asChild>
                          <Button onClick={() => handleCapNhatKho(kho)}>
                            Cập nhật kho
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cập nhật thông tin kho</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {/* các trường thông tin kho cần cập nhật */}
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                Tên kho
                              </label>
                              <Input
                                id="name"
                                value={selectedKho?.name}
                                className="col-span-3"
                                onChange={(e) =>
                                  setSelectedKho({
                                    ...selectedKho,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            {/* các trường thông tin khác */}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsCapNhatKhoOpen(false)}
                            >
                              Hủy
                            </Button>
                            <Button onClick={handleCapNhatSubmit}>
                              Cập nhật
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </Button.Group>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
