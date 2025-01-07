import React, { useState, useEffect } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib/axios";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";
import { RELIEF_CONTRIBUTIONS_APIS } from "@/apis/relief-contribution";
import { CONTRIBUTIONS_DETAIL_APIS } from "@/apis/contribution-detail";

export default function WarehouseDashboard() {
  const user = getCurrentUser();

  const [warehouses, setWarehouses] = useState([]);
  const [isViewWarehouseOpen, setIsViewWarehouseOpen] = useState(false);
  const [isUpdateWarehouseOpen, setIsUpdateWarehouseOpen] = useState(false);
  const [isAddSupplyOpen, setIsAddSupplyOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [supplies, setSupplies] = useState([
    { name: "", unit: "", providedQuantity: 0 },
  ]);
  const [donor, setDonor] = useState({
    phone: "",
    name: "",
    address: "",
  });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await SUPPORT_LOCATION_APIS.getAllWarehouseByUserId(
        user._id
      );
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const handleViewWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsViewWarehouseOpen(true);
  };

  const handleUpdateWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsUpdateWarehouseOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      await SUPPORT_LOCATION_APIS.updateWarehouse(
        selectedWarehouse._id,
        selectedWarehouse
      );
      setIsUpdateWarehouseOpen(false);
      fetchWarehouses();
      toast.success("Cập nhật kho hàng thành công!");
    } catch (error) {
      console.error("Error updating warehouse:", error);
      toast.error("Lỗi khi cập nhật kho hàng!");
    }
  };

  const handleAddSupply = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsAddSupplyOpen(true);
  };
  const handleAddSupplySubmit = async () => {
    try {
      const updatedWarehouse = {
        ...selectedWarehouse,
        supplies: [...selectedWarehouse.supplies, ...supplies],
      };

      const reliefContribution = await RELIEF_CONTRIBUTIONS_APIS.save({
        donarName: donor.name,
        supportLocationId: updatedWarehouse._id,
        phone: donor.phone,
        verifierId: user._id,
        address: donor.address,
      });

      await CONTRIBUTIONS_DETAIL_APIS.addItems(
        reliefContribution.data.data._id,
        supplies
      );

      // await SUPPORT_LOCATION_APIS.updateWarehouse(
      //   selectedWarehouse._id,
      //   updatedWarehouse
      // );
      setSupplies([{ name: "", unit: "", providedQuantity: 0 }]);
      setDonor({
        phone: "",
        name: "",
        address: "",
      });
      setIsAddSupplyOpen(false);
      fetchWarehouses();
      toast.success("Nhập hàng thành công!");
    } catch (error) {
      console.error("Error adding supplies:", error);
      toast.error("Lỗi khi nhập hàng!");
    }
  };

  const handleAddSupplyItem = () => {
    setSupplies([...supplies, { name: "", unit: "", providedQuantity: 0 }]);
  };

  const handleRemoveSupplyItem = (index) => {
    const updatedSupplies = [...supplies];
    updatedSupplies.splice(index, 1);
    setSupplies(updatedSupplies);
  };

  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý kho</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse._id}>
                  <TableCell>{warehouse.user.name}</TableCell>
                  <TableCell>{warehouse.address}</TableCell>
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
                          onClick={() => handleViewWarehouse(warehouse)}
                        >
                          Xem
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateWarehouse(warehouse)}
                        >
                          Sửa thông tin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAddSupply(warehouse)}
                        >
                          Nhập hàng
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Warehouse Dialog */}
      <Dialog open={isViewWarehouseOpen} onOpenChange={setIsViewWarehouseOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Thông tin kho hàng
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold min-w-24">Tên:</span>
                  <span>{selectedWarehouse?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold min-w-24">Số điện thoại:</span>
                  <span>{selectedWarehouse?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold min-w-24">Sức chứa:</span>
                  <span>{selectedWarehouse?.capacity}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Địa chỉ:</span>
                  <span>{selectedWarehouse?.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">Tình trạng:</span>
                  <span>{selectedWarehouse?.currentSituation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-24">
                    Khả năng hỗ trợ:
                  </span>
                  <span>{selectedWarehouse?.supportAbility}</span>
                </div>
              </div>
            </div>

            {/* Supplies Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Danh sách hàng hóa</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 font-semibold text-sm text-gray-600 mb-2 px-2">
                  <div>Tên hàng</div>
                  <div>Đơn vị</div>
                  <div>Số lượng</div>
                  <div>Còn lại</div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {selectedWarehouse?.supplies.map((supply, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-4 gap-4 p-2 rounded ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="font-medium">{supply.name}</div>
                      <div>{supply.unit}</div>
                      <div>{supply.providedQuantity}</div>
                      <div>{supply.remainingQuantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => setIsViewWarehouseOpen(false)}
              className="min-w-[100px]"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Warehouse Dialog */}
      <Dialog
        open={isUpdateWarehouseOpen}
        onOpenChange={setIsUpdateWarehouseOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật thông tin kho</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Tên kho
              </label>
              <Input
                id="name"
                value={selectedWarehouse?.name}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="currentSituation" className="text-right">
                Tình trạng hiện tại
              </label>
              <Input
                id="currentSituation"
                value={selectedWarehouse?.currentSituation}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    currentSituation: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="supportAbility" className="text-right">
                Khả năng hỗ trợ
              </label>
              <Input
                id="supportAbility"
                value={selectedWarehouse?.supportAbility}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    supportAbility: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="address" className="text-right">
                Địa chỉ
              </label>
              <Input
                id="address"
                value={selectedWarehouse?.address}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="locationType" className="text-right">
                Loại địa điểm
              </label>
              <Input
                id="locationType"
                value={selectedWarehouse?.locationType}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    locationType: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Số điện thoại
              </label>
              <Input
                id="phone"
                value={selectedWarehouse?.phone}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Mô tả
              </label>
              <Input
                id="description"
                value={selectedWarehouse?.description}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="capacity" className="text-right">
                Sức chứa
              </label>
              <Input
                id="capacity"
                value={selectedWarehouse?.capacity}
                className="col-span-3"
                onChange={(e) =>
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    capacity: e.target.value,
                  })
                }
              />
            </div>
            {/* wardCode inputs */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="wardCode1" className="text-right">
                Mã xã/phường
              </label>
              <Input
                id="wardCode1"
                value={selectedWarehouse?.wardCode?.split("|")[0]}
                className="col-span-3"
                onChange={(e) => {
                  const wardCodeParts = selectedWarehouse?.wardCode?.split("|");
                  wardCodeParts[0] = e.target.value;
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    wardCode: wardCodeParts.join("|"),
                  });
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="wardCode2" className="text-right">
                Mã quận/huyện
              </label>
              <Input
                id="wardCode2"
                value={selectedWarehouse?.wardCode?.split("|")[1]}
                className="col-span-3"
                onChange={(e) => {
                  const wardCodeParts = selectedWarehouse?.wardCode?.split("|");
                  wardCodeParts[1] = e.target.value;
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    wardCode: wardCodeParts.join("|"),
                  });
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="wardCode3" className="text-right">
                Mã tỉnh/thành phố
              </label>
              <Input
                id="wardCode3"
                value={selectedWarehouse?.wardCode?.split("|")[2]}
                className="col-span-3"
                onChange={(e) => {
                  const wardCodeParts = selectedWarehouse?.wardCode?.split("|");
                  wardCodeParts[2] = e.target.value;
                  setSelectedWarehouse({
                    ...selectedWarehouse,
                    wardCode: wardCodeParts.join("|"),
                  });
                }}
              />
            </div>
            {/* images upload */}
            {/* Implement image upload functionality based on rescue-other-form.tsx */}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateWarehouseOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleUpdateSubmit}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Supply Dialog */}
      <Dialog open={isAddSupplyOpen} onOpenChange={setIsAddSupplyOpen}>
        <DialogContent className=" w-[800px]">
          <DialogHeader>
            <DialogTitle>Nhập hàng</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Số điện thoại
              </label>
              <Input
                id="phone"
                value={donor.phone}
                className="col-span-3"
                onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="donorName" className="text-right">
                Tên người đóng góp
              </label>
              <Input
                id="donorName"
                value={donor.name}
                className="col-span-3"
                onChange={(e) => setDonor({ ...donor, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="donorAddress" className="text-right">
                Địa chỉ
              </label>
              <Input
                id="donorAddress"
                value={donor.address}
                className="col-span-3"
                onChange={(e) =>
                  setDonor({ ...donor, address: e.target.value })
                }
              />
            </div>
            {supplies.map((supply, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Hàng hóa {index + 1}</div>
                <div className="col-span-3 grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Tên hàng"
                    value={supply.name}
                    onChange={(e) => {
                      const updatedSupplies = [...supplies];
                      updatedSupplies[index].name = e.target.value;
                      setSupplies(updatedSupplies);
                    }}
                  />
                  <Input
                    placeholder="Đơn vị"
                    value={supply.unit}
                    onChange={(e) => {
                      const updatedSupplies = [...supplies];
                      updatedSupplies[index].unit = e.target.value;
                      setSupplies(updatedSupplies);
                    }}
                  />
                  <div className="flex">
                    <Input
                      type="number"
                      placeholder="Số lượng"
                      value={supply.providedQuantity}
                      onChange={(e) => {
                        const updatedSupplies = [...supplies];
                        updatedSupplies[index].providedQuantity = parseInt(
                          e.target.value
                        );
                        setSupplies(updatedSupplies);
                      }}
                    />
                    {index > 0 && (
                      <Button
                        variant="outline"
                        className="ml-2"
                        onClick={() => handleRemoveSupplyItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right">
              <Button variant="outline" onClick={handleAddSupplyItem}>
                + Thêm hàng hóa
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSupplyOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddSupplySubmit}>Nhập hàng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
