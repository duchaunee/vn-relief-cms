"use client";

import RequestReliefContext from "@/providers/app-context-provider/request-relief-provider";
import { useQuery } from "@tanstack/react-query";
import { ROLES_APIS } from "@/apis/roles";
import { transformData } from "@/utils/helper/common";
import ModalContainer from "@/components/modal/modal-container";
import EmptyData from "@/constants/empty-data";
import { CloudOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { DisasterReliefDashboard } from "./_components/mapping-detail-ui/disaster-relief-dashboard";
import VolunteerForm from "@/components/modal/request-rescue-modal/volunteer-form";
import { getCurrentUser, isAuthenticatedByRole } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { USER_APIS } from "@/apis/user";

const titleList = {
  title: "Danh sách các tình nguyện viên",
  button: "Đăng ký tình nguyện viên",
};

export default function Page() {
  const user = getCurrentUser();

  const query = useQuery({
    queryKey: ["volunteer"],
    queryFn: USER_APIS.getByRole([2, 3, 4]),
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
          title="Chưa có thông tin tình nguyện viên nào"
          description="Không tìm thấy thông tin tình nguyện viên nào.
                      Vui lòng thử lại."
          icon={<CloudOff className="h-8 w-8 text-gray-400" />}
          removeText={`${
            !isAuthenticatedByRole("volunteer")
              ? "Đăng ký tình nguyện viên"
              : ""
          }`}
          // onRemove={handleSignVolunteer}
        />
      ) : (
        <DisasterReliefDashboard
          titleList={titleList}
          locations={rescueRequestData}
        />
      )}

      {/* <ModalContainer
        title="Đơn đăng ký tình nguyện viên"
        description="Việc gửi đơn sẽ cần xác minh đề phòng trường hợp giả mạo"
        buttons={{
          primary: "Đăng ký",
          secondary: "Huỷ bỏ",
        }}
        formId="volunteer-form-id"
      > */}
      <VolunteerForm />
      {/* </ModalContainer> */}
    </RequestReliefContext>
  );
}
