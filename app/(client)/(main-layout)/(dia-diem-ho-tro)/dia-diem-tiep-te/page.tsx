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
import ResidenceForm from "@/components/modal/request-rescue-modal/residence-form";
import CommissariatForm from "@/components/modal/request-rescue-modal/commissariat-form";

const titleList = {
  title: "Danh sách các địa điểm tiếp tế lương thực",
  button: "Thêm mới địa điểm tiếp tế",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["support-location-commissariat"],
    queryFn: SUPPORT_LOCATION_APIS.getAllByType("commissariat"),
  });
  const commissariatData = transformData(query?.data?.data);

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
      {commissariatData?.length == 0 ? (
        <EmptyData
          title="Chưa có thông tin địa điểm tiếp tế nào"
          description="Không tìm thấy thông tin địa điểm tiếp tế nào.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Đăng ký địa điểm tiếp tế"
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={commissariatData}
        />
      )}
      <ModalContainer
        title="Đơn đăng ký địa điểm tiếp tế"
        description=""
        buttons={{
          primary: "Tạo địa điểm tiếp tế",
          secondary: "Huỷ bỏ",
        }}
        formId="commissariat-form-id"
      >
        <CommissariatForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
