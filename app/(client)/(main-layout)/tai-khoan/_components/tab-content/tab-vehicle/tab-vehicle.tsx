import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Edit, MoreVertical, Trash, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VEHICLE_APIS } from "@/apis/vehicle";
import { getCurrentUser } from "@/lib/axios";

const VehicleManagementDashboard = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  console.log(
    "\n🔥 ~ file: tab-vehicle.tsx:46 ~ editingVehicle::\n",
    editingVehicle
  );
  const [deletingVehicle, setDeletingVehicle] = useState(null);

  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const user = getCurrentUser();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const userId = user._id;
        const response = (await VEHICLE_APIS.getVehicleByUserId(userId))?.data;
        setVehicleInfo(response.vehicle);
        setDeliveries(response.transportSuppliers);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleEditVehicle = async () => {
    await VEHICLE_APIS.update(editingVehicle._id, {
      licensePlate: editingVehicle.licensePlate,
      vehicleType: editingVehicle.vehicleType,
      status: editingVehicle.status,
      supportCapability: editingVehicle.supportCapability,
    });
    // Update vehicle info logic here
    setVehicleInfo(editingVehicle);
    setIsEditOpen(false);
    toast.success("Đã cập nhật thông tin phương tiện!");
  };

  const handleDeleteVehicle = async () => {
    await VEHICLE_APIS.delete(vehicleInfo._id);
    // Delete vehicle logic here
    setIsDeleteOpen(false);
    toast.success("Đã xóa phương tiện!");
  };

  const handleStatusChange = (deliveryId, newStatus) => {
    if (newStatus === "completed") {
      setSelectedDelivery(deliveries.find((d) => d.id === deliveryId));
      setIsConfirmationOpen(true);
      return;
    }

    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );
    toast.success("Đã cập nhật trạng thái vận chuyển!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelivery = () => {
    if (!selectedImage) {
      toast.error("Vui lòng tải lên ảnh xác nhận!");
      return;
    }

    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === selectedDelivery.id
          ? {
              ...delivery,
              status: "completed",
              confirmationImage: selectedImagePreview,
            }
          : delivery
      )
    );

    setIsConfirmationOpen(false);
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setSelectedDelivery(null);
    toast.success("Đã xác nhận hoàn thành vận chuyển!");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge variant="secondary">Không hoạt động</Badge>;
      case "unavailable":
        return (
          <Badge variant="secondary" className="text-green-500 bg-green-100">
            Đang hoạt động
          </Badge>
        );
      default:
        return <Badge>Đang hoạt động</Badge>;
    }
  };

  if (!vehicleInfo) return;
  console.log(
    "\n🔥 ~ file: tab-vehicle.tsx:156 ~ vehicleInfo::\n",
    vehicleInfo
  );

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="info">Thông tin phương tiện</TabsTrigger>
          <TabsTrigger value="deliveries">Lịch trình vận chuyển</TabsTrigger>
        </TabsList>

        {/* Vehicle Info Tab */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phương tiện</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Biển số xe</TableHead>
                    <TableHead>Loại xe</TableHead>
                    {/* <TableHead>Tải trọng</TableHead> */}
                    <TableHead>Trạng thái</TableHead>
                    {/* <TableHead>Vị trí hiện tại</TableHead> */}
                    <TableHead>Khả năng hỗ trợ</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{vehicleInfo.licensePlate}</TableCell>
                    <TableCell>{vehicleInfo.vehicleType}</TableCell>
                    {/* <TableCell>{vehicleInfo.capacity}</TableCell> */}
                    <TableCell>{getStatusBadge(vehicleInfo.status)}</TableCell>
                    {/* <TableCell>{vehicleInfo.currentLocation}</TableCell> */}
                    <TableCell>{vehicleInfo.supportCapability}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingVehicle({ ...vehicleInfo }); // Sao chép thông tin phương tiện vào editingVehicle
                              setIsEditOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setDeletingVehicle(vehicleInfo);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Edit Vehicle Dialog */}
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin phương tiện</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="licensePlate" className="text-right">
                        Biển số xe
                      </Label>
                      <Input
                        id="licensePlate"
                        value={editingVehicle?.licensePlate || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) => ({
                            ...prev,
                            licensePlate: e.target.value,
                          }))
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="vehicleType" className="text-right">
                        Loại xe
                      </Label>
                      <Input
                        id="vehicleType"
                        value={editingVehicle?.vehicleType || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) => ({
                            ...prev,
                            vehicleType: e.target.value,
                          }))
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Trạng thái
                      </Label>
                      <Select
                        value={editingVehicle?.status || ""}
                        onValueChange={(value) =>
                          setEditingVehicle((prev) => ({
                            ...prev,
                            status: value,
                          }))
                        }
                        className="col-span-3"
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unavailable">
                            Đang hoạt động
                          </SelectItem>
                          <SelectItem value="available">
                            Không hoạt động
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="supportCapability" className="text-right">
                        Khả năng hỗ trợ
                      </Label>
                      <Input
                        id="supportCapability"
                        value={editingVehicle?.supportCapability || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) => ({
                            ...prev,
                            supportCapability: e.target.value,
                          }))
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleEditVehicle}>Lưu thay đổi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation Dialog */}
              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Xác nhận xóa phương tiện</DialogTitle>
                    <DialogDescription>
                      Bạn có chắc chắn muốn xóa phương tiện này? Hành động này
                      không thể hoàn tác.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteVehicle}>
                      Xóa
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deliveries Tab */}
        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Lịch trình vận chuyển</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Điểm đi</TableHead>
                    <TableHead>Điểm đến</TableHead>
                    <TableHead>Hàng hóa</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>{delivery.title}</TableCell>
                      <TableCell>{delivery.pickupLocation}</TableCell>
                      <TableCell>{delivery.deliveryLocation}</TableCell>
                      <TableCell>{delivery.items}</TableCell>
                      <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Select
                            value={delivery.status}
                            onValueChange={(value) =>
                              handleStatusChange(delivery.id, value)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Cập nhật trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Chờ xử lý</SelectItem>
                              <SelectItem value="in_progress">
                                Đang thực hiện
                              </SelectItem>
                              <SelectItem value="completed">Đã xong</SelectItem>
                            </SelectContent>
                          </Select>

                          {delivery.status === "completed" &&
                            delivery.confirmationImage && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedImagePreview(
                                    delivery.confirmationImage
                                  );
                                  setIsUpdateStatusOpen(true);
                                }}
                              >
                                <Camera className="h-4 w-4" />
                              </Button>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* View Image Dialog */}
              <Dialog
                open={isUpdateStatusOpen}
                onOpenChange={setIsUpdateStatusOpen}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ảnh xác nhận giao hàng</DialogTitle>
                  </DialogHeader>
                  {selectedImagePreview && (
                    <img
                      src={selectedImagePreview}
                      alt="Confirmation"
                      className="w-full rounded-lg"
                    />
                  )}
                  <DialogFooter>
                    <Button onClick={() => setIsUpdateStatusOpen(false)}>
                      Đóng
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Confirmation Dialog */}
              <Dialog
                open={isConfirmationOpen}
                onOpenChange={setIsConfirmationOpen}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Xác nhận hoàn thành vận chuyển</DialogTitle>
                    <DialogDescription>
                      Vui lòng tải lên ảnh xác nhận đã giao hàng
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Ảnh xác nhận</Label>
                    <div
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary"
                      onClick={() => document.getElementById("picture").click()}
                    >
                      {selectedImagePreview ? (
                        <img
                          src={selectedImagePreview}
                          alt="Preview"
                          className="max-h-[200px] mx-auto rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <UploadCloud className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Click để tải ảnh lên
                          </span>
                        </div>
                      )}
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsConfirmationOpen(false);
                        setSelectedImage(null);
                        setSelectedImagePreview(null);
                      }}
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleConfirmDelivery}>
                      Xác nhận hoàn thành
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default VehicleManagementDashboard;
