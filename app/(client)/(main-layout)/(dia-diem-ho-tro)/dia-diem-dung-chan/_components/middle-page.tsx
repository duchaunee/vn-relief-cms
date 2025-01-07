import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { RequestData } from "@/types/models/rescue-request";
import { RescueRequestItem } from "@/types/models/rescue-request-item";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TEAM_RESCUE_REQUEST_APIS } from "@/apis/team-rescue-request";

const Middle = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["temporary-stop-detail", id])?.data;

  const user = getCurrentUser();

  const registerSave = () => {
    // if (!user.rescueTeamId)
    //   return toast.error("Vui lòng nhập/tạo đội cứu trợ để đảm bảo an toàn !");

    setOpenDialog(true);
  };

  const handleRegister = async () => {
    // await TEAM_RESCUE_REQUEST_APIS.receivedSaveRescueReqeust(
    //   user.rescueTeamId._id,
    //   id
    // );

    setOpenDialog(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Tổng hợp hình ảnh tình hình thực tế
          </h2>
        </CardHeader>
        <CardContent>
          {data?.images.length > 0 ? (
            <div className="flex gap-2">
              {data?.images.map((image) => (
                <a
                  href={image}
                  target="_blank"
                  className="border-2 border-dashed border-gray-300 rounded-lg w-[150px] h-[150px] aspect-square flex items-center justify-center lg:hover:border-gray-500 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt=""
                    width={150}
                    height={150}
                    className="text-muted-foreground object-cover"
                  ></Image>
                </a>
              ))}
            </div>
          ) : (
            "Không có hình ảnh"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Middle;
