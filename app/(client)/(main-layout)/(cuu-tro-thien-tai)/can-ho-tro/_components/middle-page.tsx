import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { RESCUE_REQUEST_ITEMS_APIS } from "@/apis/rescue-request-item";
import { TEAM_RESCUE_REQUEST_APIS } from "@/apis/team-rescue-request";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RequestData } from "@/types/models/rescue-request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import ModalRegisterSupport from "./RegisterSupportModal";
import { VEHICLE_APIS } from "@/apis/vehicle";
import { getCurrentUser } from "@/lib/axios";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";
import StatusTimeline from "./status-time-line";
import { formatStatusMessagesReceivedRescueRequest } from "@/utils/helper/common";

const Middle = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["rescue-request-detail", id])?.data;

  const rescueRequestItemsQuery = useQuery({
    queryKey: ["rescue-request-items", id],
    queryFn: RESCUE_REQUEST_ITEMS_APIS.getAllByRescueRequestId(id as string),
  });

  // const teamRescueRequestsQuery = useQuery({
  //   queryKey: ["team-rescue-request", id],
  //   queryFn: TEAM_RESCUE_REQUEST_APIS.getAllByRescueRequestId(id as string),
  // });

  const teamRescueRequestsQuery = useQuery({
    queryKey: ["all-received-request", id],
    queryFn: RESCUE_REQUEST_APIS.getReceivedRequestsController(id as string),
  });

  //get all vehicle of user
  const vehiclesQuery = useQuery({
    queryKey: ["vehicles", id],
    queryFn: VEHICLE_APIS.getAllByUserId(getCurrentUser()._id),
  });

  const rescueRequestItemsData = rescueRequestItemsQuery?.data?.data;
  const teamRescueRequestsData = teamRescueRequestsQuery?.data?.data;

  const haveHistoryReceived =
    teamRescueRequestsData?.transportSupplies?.length > 0 &&
    teamRescueRequestsData?.userContributions?.length > 0;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">Các yêu cầu hỗ trợ vật tư</h2>
        </CardHeader>
        <CardContent>
          {rescueRequestItemsData?.length == 0 && (
            <div className="border-2 border-dashed rounded-lg py-10 flex items-center justify-center">
              <span>Không có yêu cầu hỗ trợ vật tư</span>
            </div>
          )}

          <div className="relative overflow-x-auto border border-dashed sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-900">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tên vật phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đơn vị
                  </th>
                </tr>
              </thead>
              <tbody>
                {rescueRequestItemsData?.length > 0 &&
                  rescueRequestItemsData.map((item: any) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.unit}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Lịch sử hỗ trợ cho trường hợp này
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {haveHistoryReceived ? (
            <StatusTimeline
              messages={formatStatusMessagesReceivedRescueRequest(
                teamRescueRequestsData
              )}
            />
          ) : (
            <span>Chưa có lịch sử nào</span>
          )}
          <Button
            variant="outline"
            size="sm"
            className={cn("mt-4 border border-gray-300 bg-gray-200")}
            onClick={() => setShowModal(true)}
          >
            Đăng ký cứu trợ
            <ArrowRight className="w-6 h-6" />
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Tổng hợp hình ảnh tình hình thực tế
          </h2>
        </CardHeader>
        <CardContent>
          {data?.images.length > 0 ? (
            <div className="flex gap-2">
              {data?.images.map((image, index) => (
                <a
                  key={index}
                  href={image}
                  target="_blank"
                  className="border-2 border-dashed border-gray-300 rounded-lg w-[150px] h-[150px] aspect-square flex items-center justify-center lg:hover:border-gray-500 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt=""
                    width={150}
                    height={150}
                    className="text-muted-foreground object-contain"
                  />
                </a>
              ))}
            </div>
          ) : (
            "Không có hình ảnh"
          )}
        </CardContent>
      </Card>

      <ModalRegisterSupport
        open={showModal}
        onOpenChange={setShowModal}
        rescueRequestItemsData={rescueRequestItemsData || []}
      />
    </div>
  );
};

export default Middle;
