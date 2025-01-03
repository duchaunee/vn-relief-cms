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
import RescueRequestOtherForm from "@/components/modal/request-rescue-modal/rescue-other-form";

const titleList = {
  title: "Danh sách các nơi đang cần hỗ trợ sau thiên tai",
  button: "Tạo yêu cầu hỗ trợ",
};

export default function Page() {
  const query = useQuery({
    queryKey: ["rescue-request-other"],
    queryFn: RESCUE_REQUEST_APIS.getAll("other"),
  });
  const rescueRequestData = transformData(query?.data?.data);

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
          title="Chưa có thông tin đơn cứu trợ nào"
          description="Không tìm thấy thông tin đơn cứu trợ noà.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText="Gửi đơn hỗ trợ"
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={rescueRequestData}
        />
      )}
      <ModalContainer
        title="Gửi thông tin xin hỗ trợ thiên tai"
        description="Việc gửi đơn sẽ cần xác minh đề phòng trường hợp giả mạo"
        buttons={{
          primary: "Gửi đơn hỗ trợ",
          secondary: "Huỷ bỏ",
        }}
        formId="rescue-form-other-id"
      >
        <RescueRequestOtherForm />
      </ModalContainer>
    </RequestReliefContext>
  );
}
