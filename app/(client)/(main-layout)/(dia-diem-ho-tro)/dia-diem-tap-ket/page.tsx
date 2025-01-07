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
import WarehouseForm from "@/components/modal/request-rescue-modal/warehouse-form";

const titleList = {
  title: "Danh sách các địa điểm tập kết",
  button: "Thêm mới địa điểm tập kết",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["support-location-warehouse"],
    queryFn: SUPPORT_LOCATION_APIS.getAllByType("warehouse"),
  });
  const warehouseData = transformData(query?.data?.data);

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
      {warehouseData?.length == 0 ? (
        <EmptyData
          title="Chưa có thông tin địa điểm tập kết nào"
          description="Không tìm thấy thông tin địa điểm tập kết nào.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Đăng ký địa điểm tập kết"
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={warehouseData}
        />
      )}
      <ModalContainer
        title="Đơn đăng ký địa điểm tập kết"
        description=""
        buttons={{
          primary: "Tạo địa điểm tập kết",
          secondary: "Huỷ bỏ",
        }}
        formId="warehouse-form-id"
      >
        <WarehouseForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
