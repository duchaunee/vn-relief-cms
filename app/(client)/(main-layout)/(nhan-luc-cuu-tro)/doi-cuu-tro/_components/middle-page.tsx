import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EmptyData from "@/constants/empty-data";
import { getCurrentUser } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { RequestData } from "@/types/models/rescue-request";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CloudOff, ImagePlus, User } from "lucide-react";
import Image from "next/image";
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
import { TEAM_RESCUE_USER_APIS } from "@/apis/team-rescue-user";

const Middle = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const user = getCurrentUser();
  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["rescue-teams-detail", id])?.data;
  const members = data?.members;

  const handleRegister = async () => {
    await TEAM_RESCUE_USER_APIS.save(data?._id, {
      userId: user._id,
    });
    toast.success("Đăng ký thành công, vui lòng chờ đội cứu trợ duyệt !");
    setOpenDialog(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <h2 className="text-lg font-medium">Các thành viên trong đội</h2>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <div className="flex flex-col gap-4">
              {members.map((member, index) => (
                <div
                  key={member._id || index}
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <User className="h-12 w-12 mb-4" />
              <p>Chưa có thành viên nào trong đội</p>
            </div>
          )}
          {!user.rescueTeamId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenDialog(true)}
              className={cn("border border-gray-300 bg-gray-200 mt-4")}
            >
              Đăng ký thành viên
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng ký thành viên</DialogTitle>
          </DialogHeader>
          <div>Bạn có chắc chắn muốn đăng ký thành viên đội cứu trợ?</div>
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
