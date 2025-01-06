// ModalRegisterSupport.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Truck, User, Warehouse, Package, AlertCircle } from "lucide-react";
import { TRANSACTIONS_APIS } from "@/apis/transaction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCurrentUser } from "@/lib/axios";
import { VEHICLE_APIS } from "@/apis/vehicle";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";
import { TRANSPORT_SUPPLIES_APIS } from "@/apis/transport-supplies";
import { TRANSPORT_HISTORIES_APIS } from "@/apis/transport-histories";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rescueRequestItemsData: any[];
}

export default function ModalRegisterSupport({
  open,
  onOpenChange,
  rescueRequestItemsData,
}: Props) {
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [supportType, setSupportType] = useState(null);
  // const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setSelectedItems({});
    setSelectedVehicle(null);
    setSupportType(null);
    // setSelectedWarehouse(null);
    setErrors({});
  };

  const handleCheckboxChange = (itemId, checked) => {
    if (checked) {
      setSelectedItems((prev) => ({ ...prev, [itemId]: 1 })); // Set initial quantity to 1
    } else {
      const newSelected = { ...selectedItems };
      delete newSelected[itemId];
      setSelectedItems(newSelected);
    }
    if (errors.items) {
      setErrors((prev) => ({ ...prev, items: null }));
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 0) return;
    const item = rescueRequestItemsData?.find((item) => item._id === itemId);
    if (item && quantity > parseInt(item.remainingQuantity)) {
      toast.error(
        `Số lượng không thể vượt quá ${item.remainingQuantity} (${item.unit})`
      );
      return;
    }
    setSelectedItems((prev) => ({ ...prev, [itemId]: quantity }));
    if (errors.items) {
      setErrors((prev) => ({ ...prev, items: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate items
    if (Object.keys(selectedItems).length === 0) {
      newErrors.items = "Vui lòng chọn ít nhất một vật phẩm";
      isValid = false;
    } else {
      const invalidQuantities = Object.entries(selectedItems).some(
        ([itemId, quantity]) => quantity <= 0
      );
      if (invalidQuantities) {
        newErrors.items = "Vui lòng kiểm tra lại số lượng các vật phẩm";
        isValid = false;
      }
    }

    // Validate support type
    if (!supportType) {
      newErrors.supportType = "Vui lòng chọn hình thức hỗ trợ";
      isValid = false;
    }

    // Validate vehicle and warehouse if needed
    if (supportType === "warehouse") {
      if (!selectedVehicle) {
        newErrors.vehicle = "Vui lòng chọn phương tiện";
        isValid = false;
      }
      // if (!selectedWarehouse) {
      //   newErrors.warehouse = "Vui lòng chọn điểm tập kết";
      //   isValid = false;
      // }
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Vui lòng điền đủ các thông tin", {
        icon: <AlertCircle className="text-red-500" />,
      });
    }

    return isValid;
  };

  //========================================================
  const queryClient = useQueryClient();
  const [supportLocationVehicleReceived, setSupportLocationVehicleReceived] =
    useState([]);
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const vehiclesQuery = queryClient.getQueryData(["vehicles", id]);

  const handleSubmit = async () => {
    if (validateForm()) {
      const submitData = {
        selectedItems,
        selectedVehicle,
        supportType,
        // selectedWarehouse,
      };
      console.log("Submit data:", submitData);

      if (submitData.supportType == "personal") {
        const rescueRequestData = queryClient.getQueryData([
          "rescue-request-detail",
          id,
        ])?.data;

        //ghi nhận giao dịch
        await TRANSACTIONS_APIS.save(rescueRequestData._id, {
          userId: currentUser._id,
          amount: submitData.selectedItems,
        });
      } else if (supportType == "warehouse") {
        //====================Kiểm tra xem vehicles được chọn, ĐÃ NHẬN HÀNG Ở ĐIỂM TẬP KẾT NÀO CHƯA, NẾU CHƯA THÌ BÁO LỖI
        const supportLocationVehicleReceived =
          await SUPPORT_LOCATION_APIS.getAllByVehicleId(
            submitData.selectedVehicle
          );
        if (supportLocationVehicleReceived?.data.length == 0) {
          return toast.error(
            "Phương tiện chưa nhận hàng tại bất kỳ điểm tập kết nào "
          );
        }
        //====================
        //Check xem vehicle đã nhận đơn này chưa, nếu nhận rồi thì không cho nhận nữa
        const vehicleReceiveRescueRequest =
          await TRANSPORT_SUPPLIES_APIS.checkExistVehicleReceivedRescueRequest({
            vehicleId: submitData.selectedVehicle,
            rescueRequestId: id,
          });
        if (vehicleReceiveRescueRequest?.data?.length > 0) {
          return toast.error("Phương tiện đã nhận đơn cứu trợ này rồi");
        }
        //====================
        await TRANSPORT_SUPPLIES_APIS.save({
          vehicleId: submitData.selectedVehicle,
          rescueRequestId: id,
          amount: submitData.selectedItems,
        });
        await TRANSPORT_HISTORIES_APIS.save(submitData.selectedVehicle, {
          status: "in_transit",
          notes: null,
        });
      }

      toast.success("Đăng ký hỗ trợ thành công!");
      onOpenChange(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>Đăng ký hỗ trợ</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              <span>Bạn có thể hỗ trợ những gì? (ước lượng)</span>
            </h3>
            {errors.items && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.items}
              </p>
            )}
            <div className="space-y-2">
              {rescueRequestItemsData?.map((item) => (
                <div
                  key={item._id}
                  className={cn(
                    "flex items-center gap-4 px-4 py-2 border rounded-lg transition-colors",
                    selectedItems[item._id]
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  )}
                >
                  <label className="flex items-center gap-4 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      id={item._id}
                      checked={!!selectedItems[item._id]}
                      onChange={() =>
                        handleCheckboxChange(item._id, !selectedItems[item._id])
                      }
                      className="w-4 h-4 cursor-pointer rounded text-blue-500"
                    />
                    <span className="flex-1 text-lg">{item.name}</span>
                  </label>
                  <div className="flex items-center gap-3 ml-auto">
                    <input
                      type="number"
                      min="0"
                      max={parseInt(item.remainingQuantity)}
                      disabled={!selectedItems[item._id]} // Disable khi checkbox không được chọn
                      value={selectedItems[item._id] || ""} // Hiển thị giá trị từ selectedItems hoặc rỗng
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                      className={cn(
                        "w-24 px-3 py-1 border rounded-lg disabled:bg-gray-100",
                        selectedItems[item._id] &&
                          "border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      )}
                      placeholder="Số lượng"
                    />
                    <span className="text-gray-600">
                      Còn lại: {item.remainingQuantity} (Đơn vị: {item.unit})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Hình thức hỗ trợ</span>
            </h3>
            {errors.supportType && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.supportType}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={cn(
                  "flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors",
                  supportType === "personal"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                )}
                onClick={() => setSupportType("personal")}
              >
                <input
                  type="radio"
                  className="sr-only"
                  checked={supportType === "personal"}
                  onChange={() => setSupportType("personal")}
                />
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <span className="font-medium">Hỗ trợ cá nhân</span>
                <span className="text-sm text-gray-500 text-center">
                  Hỗ trợ cá nhân không thông qua điểm tập kết
                </span>
              </div>
              <div
                className={cn(
                  "flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors",
                  supportType === "warehouse"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                )}
                onClick={() => setSupportType("warehouse")}
              >
                <input
                  type="radio"
                  className="sr-only"
                  checked={supportType === "warehouse"}
                  onChange={() => setSupportType("warehouse")}
                />
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                  <Warehouse className="w-6 h-6 text-blue-500" />
                </div>
                <span className="font-medium">Hỗ trợ qua điểm tập kết</span>
                <span className="text-sm text-gray-500 text-center">
                  Tức là hàng hỗ trợ của bạn lấy từ điểm tập kết
                </span>
              </div>
            </div>
          </div>

          {supportType === "warehouse" && (
            <>
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Chọn phương tiện hỗ trợ</span>
                </h3>
                {errors.vehicle && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.vehicle}
                  </p>
                )}
                <Select
                  value={selectedVehicle}
                  onValueChange={async (vehivleId) => {
                    setSelectedVehicle(vehivleId);

                    const response =
                      await SUPPORT_LOCATION_APIS.getAllByVehicleId(vehivleId);
                    console.log(
                      "\n🔥 ~ file: RegisterSupportModal.tsx:321 ~ response::\n",
                      response
                    );
                    setSupportLocationVehicleReceived(response?.data);
                  }}
                >
                  <SelectTrigger
                    className={cn("w-full", errors.vehicle && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn phương tiện hỗ trợ của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehiclesQuery?.data?.map((vehicle) => (
                      <SelectItem key={vehicle._id} value={vehicle._id}>
                        {vehicle.vehicleType} / {vehicle.licensePlate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-blue-500" />
                  <span>Chọn điểm tập kết</span>
                </h3>
                {errors.warehouse && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.warehouse}
                  </p>
                )}
                <Select
                  value={selectedWarehouse}
                  onValueChange={setSelectedWarehouse}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.warehouse && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Chọn điểm tập kết lấy hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportLocationVehicleReceived?.length > 0 &&
                      supportLocationVehicleReceived.map((warehouse) => (
                        <SelectItem key={warehouse._id} value={warehouse._id}>
                          {warehouse.address} - {warehouse.phone}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div> */}
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Huỷ bỏ
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Đăng ký hỗ trợ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
