"use client";

import { useQuery } from "@tanstack/react-query";
import { LeftPage, MiddlePage, RightPage } from "../_components";
import { useParams } from "next/navigation";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { VEHICLE_APIS } from "@/apis/vehicle";
import { SUPPORT_LOCATION_APIS } from "@/apis/support-location";

export default function page() {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["residence-detail", id],
    queryFn: SUPPORT_LOCATION_APIS.getById(id as string),
  });

  const temporaryStopData = query?.data?.data ? query?.data?.data : [];
  if (temporaryStopData?.length == 0) return;

  return (
    <div className="w-full p-0 lg:p-4">
      {/* <BackButton text="Thông tin cần cứu trợ VN133" onClick={handleBack} /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LeftPage />
        <MiddlePage />
        <RightPage />
      </div>
    </div>
  );
}
