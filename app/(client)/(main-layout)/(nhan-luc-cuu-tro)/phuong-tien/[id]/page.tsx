"use client";

import { useQuery } from "@tanstack/react-query";
import { LeftPage, MiddlePage, RightPage } from "../_components";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { useParams } from "next/navigation";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { VEHICLE_APIS } from "@/apis/vehicle";

export default function page() {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["vehicle-detail", id],
    queryFn: VEHICLE_APIS.getById(id as string),
  });

  const vehiclesData = query?.data?.data ? query?.data?.data : [];
  if (vehiclesData?.length == 0) return;

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
