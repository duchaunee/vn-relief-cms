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

const titleList = {
  title: "Danh sách các phương tiện",
  button: "Thêm mới phương tiện",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["rescue-team"],
    queryFn: RESCUE_TEAMS_APIS.getAll("active"),
  });
  const rescueRequestData = transformData(query?.data?.data);

  const user = getCurrentUser();
  const router = useRouter();
  const handleSignVolunteer = async () => {
    if (!user) return router.push("/dang-ky");
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
      {rescueRequestData?.length == 0 ? (
        <EmptyData
          title="Chưa có thông tin đội cứu trợ nào"
          description="Không tìm thấy thông tin phương tiện nào.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Đăng ký phương tiện"
          onRemove={handleSignVolunteer}
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={rescueRequestData}
        />
      )}
      <ModalContainer
        title="Đơn đăng ký phương tiện"
        description=""
        buttons={{
          primary: "Tạo đội cứu trợ",
          secondary: "Huỷ bỏ",
        }}
        formId="vehicle-id"
      >
        <RescueTeamForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
