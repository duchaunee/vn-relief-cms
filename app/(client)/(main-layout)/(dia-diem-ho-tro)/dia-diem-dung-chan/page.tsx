"use client";

import RequestReliefContext, {
  useRequestReliefContext,
} from "@/providers/app-context-provider/request-relief-provider";
import { useQuery } from "@tanstack/react-query";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { transformData } from "@/utils/helper/common";
import ModalContainer from "@/components/modal/modal-container";
import RescueRequestForm from "@/components/modal/request-rescue-modal/rescue-form";
import EmptyData from "@/constants/empty-data";
import { CloudOff, SearchX } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import RescueRequestOtherForm from "@/components/modal/request-rescue-modal/rescue-other-form";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { DisasterReliefDashboard } from "./_components/mapping-detail-ui/disaster-relief-dashboard";
import RescueTeamForm from "@/components/modal/request-rescue-modal/rescue-team-form";
import { getCurrentUser } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";
import TemporaryStopForm from "@/components/modal/request-rescue-modal/temporary-stop-form";

const titleList = {
  title: "Danh sách các địa điêm dừng chân",
  button: "Thêm mới địa điểm dừng chân",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["support-location-temporary-stop"],
    queryFn: SUPPORT_LOCATION_APIS.getAllByType("temporary_stop"),
  });
  const temporaryStopData = transformData(query?.data?.data);

  const user = getCurrentUser();
  const router = useRouter();
  const { setOpen } = useRequestReliefContext();

  const handleSignSupportLocation = async () => {
    if (!user) return router.push("/dang-ky");
    setOpen(true);
  };

  if (query.isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner
          size="lg"
          className="bg-black dark:bg-white"
          loading={query.isFetching}
        />
      </div>
    );

  return (
    <RequestReliefContext>
      {temporaryStopData?.length == 0 ? (
        <EmptyData
          title="Chưa có thông tin địa điểm dừng chân nào"
          description="Không tìm thấy thông tin địa điểm dừng chân nào.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Đăng ký địa điểm dừng chân"
          onRemove={handleSignSupportLocation}
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={temporaryStopData}
        />
      )}
      <ModalContainer
        title="Đơn đăng ký địa điểm dừng chân"
        description=""
        buttons={{
          primary: "Tạo địa điểm dừng chân",
          secondary: "Huỷ bỏ",
        }}
        formId="temporary-stop-form-id"
      >
        <TemporaryStopForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
