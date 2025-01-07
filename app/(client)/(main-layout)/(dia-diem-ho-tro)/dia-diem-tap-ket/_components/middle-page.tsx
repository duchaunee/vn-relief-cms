import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus, List, Truck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios, { getCurrentUser } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { VEHICLE_APIS } from "@/apis/vehicle";

const Middle = () => {
  const [openSuppliesDialog, setOpenSuppliesDialog] = useState(false);
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [formData, setFormData] = useState({
    selectedItems: {},
    quantities: {},
  });
  const inputRefs = useRef({});
  const queryClient = useQueryClient();
  const { id } = useParams();

  const data = queryClient.getQueryData<any>(["warehouse-detail", id])?.data;
  const user = getCurrentUser();

  // Fetch vehicles data
  const { data: vehiclesData } = useQuery({
    queryKey: ["vehicles"],
    queryFn: VEHICLE_APIS.getAllByType(user._id),
  });
  console.log(
    "\n🔥 ~ file: middle-page.tsx:46 ~ vehiclesData::\n",
    vehiclesData
  );

  const handleReceiveGoods = async () => {
    try {
      // Validate form
      if (!selectedVehicle) {
        return toast.error("Vui lòng chọn phương tiện");
      }

      const selectedCount = Object.values(formData.selectedItems).filter(
        Boolean
      ).length;
      if (selectedCount === 0) {
        return toast.error("Vui lòng chọn ít nhất một mặt hàng");
      }

      const hasInvalidQuantity = Object.keys(formData.selectedItems).some(
        (itemId) => {
          const supply = data.supplies.find((s) => s._id === itemId);
          return (
            formData.selectedItems[itemId] &&
            (!formData.quantities[itemId] ||
              formData.quantities[itemId] <= 0 ||
              formData.quantities[itemId] > supply.remainingQuantity)
          );
        }
      );

      if (hasInvalidQuantity) {
        return toast.error("Vui lòng kiểm tra lại số lượng hàng");
      }

      const amount = Object.keys(formData.selectedItems).reduce(
        (acc, itemId) => {
          if (formData.selectedItems[itemId]) {
            acc[itemId] = parseInt(formData.quantities[itemId] || "0");
          }
          return acc;
        },
        {}
      );

      const payload = {
        vehicleId: selectedVehicle,
        pickupLocationId: id,
        amount,
        notes: `Đã lấy hàng tại điểm tập kết ${data?.address}`,
      };

      await axios.post("/transport-supplies", payload);
      toast.success("Nhận hàng thành công");
      setOpenReceiveDialog(false);
      queryClient.invalidateQueries(["warehouse-detail"]);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi nhận hàng");
    }
  };

  const handleCheckItem = (itemId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: {
        ...prev.selectedItems,
        [itemId]: checked,
      },
      quantities: {
        ...prev.quantities,
        [itemId]: checked ? "" : undefined, // Reset quantity when unchecked
      },
    }));

    if (checked) {
      setTimeout(() => {
        inputRefs.current[itemId]?.focus();
      }, 0);
    }
  };

  const SuppliesTable = () => (
    <div className="w-full overflow-hidden rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Tên hàng
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Đơn vị
            </th>
            <th className="py-3 px-4 text-right font-medium text-gray-700">
              SL cung cấp
            </th>
            <th className="py-3 px-4 text-right font-medium text-gray-700">
              SL còn lại
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Địa chỉ đóng góp
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Ghi chú
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">
              Ngày tạo
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.supplies?.map((supply: any) => (
            <tr key={supply._id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium">{supply.name}</td>
              <td className="py-3 px-4 text-gray-600">{supply.unit}</td>
              <td className="py-3 px-4 text-right font-medium">
                {supply.providedQuantity}
              </td>
              <td className="py-3 px-4 text-right font-medium">
                {supply.remainingQuantity}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {supply.contributor?.address}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {supply.contributor?.description}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {format(new Date(supply.createdAt), "dd/MM/yyyy HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!data?.supplies || data.supplies.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          Chưa có hàng hóa nào tại điểm tập kết
        </div>
      )}
    </div>
  );

  const ReceiveGoodsDialog = () => (
    <Dialog open={openReceiveDialog} onOpenChange={setOpenReceiveDialog}>
      <DialogContent className="max-w-[90vw] w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Nhận hàng tại điểm tập kết
          </DialogTitle>
        </DialogHeader>
        <div className="my-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn phương tiện vận chuyển
            </label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger className="w-full md:w-[400px]">
                <SelectValue placeholder="Chọn phương tiện..." />
              </SelectTrigger>
              <SelectContent>
                {vehiclesData?.data?.map((vehicle: any) => (
                  <SelectItem key={vehicle._id} value={vehicle._id}>
                    {vehicle.licensePlate} - {vehicle.vehicleType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="max-h-[50vh] mt-4 rounded-lg border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="p-3 text-left">Chọn</th>
                <th className="p-3 text-left">Tên hàng</th>
                <th className="p-3 text-left">Đơn vị</th>
                <th className="p-3 text-right">SL còn lại</th>
                <th className="p-3 text-right">SL nhận</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.supplies?.map((supply: any) => (
                <tr key={supply._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <Checkbox
                      checked={formData.selectedItems[supply._id]}
                      onCheckedChange={(checked) =>
                        handleCheckItem(supply._id, checked)
                      }
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </td>
                  <td className="p-3 font-medium">{supply.name}</td>
                  <td className="p-3 text-gray-600">{supply.unit}</td>
                  <td className="p-3 text-right font-medium">
                    {supply.remainingQuantity}
                  </td>
                  <td className="p-3 text-right">
                    <Input
                      ref={(el) => (inputRefs.current[supply._id] = el)}
                      type="number"
                      disabled={!formData.selectedItems[supply._id]}
                      min={1}
                      max={supply.remainingQuantity}
                      value={formData.quantities[supply._id] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          quantities: {
                            ...prev.quantities,
                            [supply._id]: e.target.value,
                          },
                        }))
                      }
                      className="w-24 text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <Button onClick={() => setOpenReceiveDialog(false)} variant="outline">
            Hủy
          </Button>
          <Button
            onClick={handleReceiveGoods}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Nhận hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-lg shadow-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Tổng hợp hình ảnh tình hình thực tế
          </h2>
        </CardHeader>
        <CardContent>
          {data?.images?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {data?.images.map((image: string, index: number) => (
                <a
                  key={index}
                  href={image}
                  target="_blank"
                  className="border-2 border-dashed border-gray-300 rounded-lg w-[150px] h-[150px] aspect-square flex items-center justify-center hover:border-blue-500 overflow-hidden transition-colors duration-200"
                >
                  <Image
                    src={image}
                    alt=""
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">Không có hình ảnh</div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full rounded-lg shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">
              Danh sách hàng hóa tại điểm tập kết
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 mb-4">
            {data?.supplies?.length ?? 0} mặt hàng có sẵn tại điểm tập kết
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenSuppliesDialog(true)}
              className="flex items-center gap-2 hover:border-blue-500 hover:text-blue-500"
            >
              <List className="h-4 w-4" />
              Xem chi tiết
            </Button>
            <Button
              variant="default"
              onClick={() => setOpenReceiveDialog(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Truck className="h-4 w-4" />
              Nhận hàng tại địa điểm này
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Supplies Dialog */}
      <Dialog open={openSuppliesDialog} onOpenChange={setOpenSuppliesDialog}>
        <DialogContent className="max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Chi tiết hàng hóa tại điểm tập kết</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] mt-4">
            <SuppliesTable />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Receive Goods Dialog */}
      <ReceiveGoodsDialog />
    </div>
  );
};

export default Middle;
