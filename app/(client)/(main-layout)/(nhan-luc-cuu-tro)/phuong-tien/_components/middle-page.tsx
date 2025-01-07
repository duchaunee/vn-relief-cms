import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, User } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { BORROW_VEHICLE_APIS } from "@/apis/borrow-vehicle";

const Middle = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPersonalUse, setIsPersonalUse] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = getCurrentUser();

  const isRescueTeamMember = user.roles?.some((role) => role.roleId.code === 1);
  console.log(
    "\n🔥 ~ file: middle-page.tsx:27 ~ isRescueTeamMember::\n",
    isRescueTeamMember
  );

  const data = queryClient.getQueryData<{
    data: any;
  }>(["vehicle-detail", id])?.data;

  const handleRegister = async () => {
    try {
      await BORROW_VEHICLE_APIS.save({
        lenderId: id,
        userId: user._id,
        rescueTeamId: !isPersonalUse ? user.rescueTeamId?._id : null, // Corrected logic
        status: "pending",
      });
      toast.success(
        "Đăng ký mượn phương tiện thành công! Vui lòng chờ phê duyệt"
      );
      queryClient.invalidateQueries(["vehicle-detail", id]);
      setOpenDialog(false);
    } catch (error) {
      toast.error("Đăng ký không thành công, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <h2 className="text-lg font-medium">
            Lịch sử các đơn mượn phương tiện này
          </h2>
        </CardHeader>
        <CardContent>
          {data?.borrowRequests?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.borrowRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <div className="ml-4 flex-1">
                    <p className="text-gray-900">
                      {`Người dùng ${request.userId.name} với số ${
                        request.userId.phone
                      } vừa đăng ký mượn ${
                        request.rescueTeamId
                          ? `cho đội cứu trợ ${request.rescueTeamId.teamName}`
                          : "cá nhân"
                      } phương tiện này`}
                    </p>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs mt-2 inline-block",
                        request.status === "pending" &&
                          "bg-yellow-100 text-yellow-800",
                        request.status === "accept" &&
                          "bg-green-100 text-green-800",
                        request.status === "decline" &&
                          "bg-red-100 text-red-800"
                      )}
                    >
                      {request.status === "pending" && "Chờ duyệt"}
                      {request.status === "accept" && "Đã duyệt"}
                      {request.status === "decline" && "Từ chối"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <User className="h-12 w-12 mb-4" />
              <p>Chưa có ai mượn phương tiện này</p>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog(true)}
            className="border border-gray-300 bg-gray-200 mt-4"
          >
            Đăng ký mượn phương tiện
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng ký mượn phương tiện</DialogTitle>
          </DialogHeader>
          {isRescueTeamMember ? (
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPersonalUse}
                  onChange={(e) => setIsPersonalUse(e.target.checked)}
                />
                Bạn mượn cá nhân?
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!isPersonalUse}
                  onChange={(e) => setIsPersonalUse(!e.target.checked)}
                />
                Bạn mượn cho đội cứu trợ?
              </label>
            </div>
          ) : (
            <div>Bạn có chắc chắn muốn mượn phương tiện này?</div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Huỷ bỏ
            </Button>
            <Button onClick={handleRegister}>Đăng ký</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Middle;
