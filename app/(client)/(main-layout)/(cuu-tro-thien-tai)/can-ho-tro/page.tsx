"use client";

import RequestReliefContext, {
  useRequestReliefContext,
} from "@/providers/app-context-provider/request-relief-provider";
import { DisasterReliefDashboard } from "@/components/mapping-detail-ui/disaster-relief-dashboard";
import { useQuery } from "@tanstack/react-query";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { transformData } from "@/utils/helper/common";
import ModalContainer from "@/components/modal/modal-container";
import RescueRequestForm from "@/components/modal/request-rescue-modal/rescue-form";
import EmptyData from "@/constants/empty-data";
import { CloudOff, SearchX } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const titleList = {
  title: "Danh sách các nơi đang cần hỗ trợ sau thiên tai",
  button: "Tạo yêu cầu hỗ trợ",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["rescue-request"],
    queryFn: RESCUE_REQUEST_APIS.getAll("other"),
  });
  const rescueRequestData = query?.data?.data
    ? transformData(query?.data?.data)
    : [];

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
          onRemove={() => window.location.reload()}
          title="Chưa có thông tin đơn cứu trợ nào"
          description="Không tìm thấy thông tin đơn cứu trợ noà.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Thử lại"
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={rescueRequestData}
        />
      )}
      <ModalContainer
        title="Gửi thông tin cứu trợ khẩn cấp"
        description="Việc gửi đơn sẽ cần xác minh đề phòng trường hợp giả mạo"
        buttons={{
          primary: "Gửi đơn cứu trợ",
          secondary: "Lưu bản nháp",
        }}
        formId="rescue-form-id"
      >
        <RescueRequestForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
