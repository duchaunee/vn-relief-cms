"use client";

import { useQuery } from "@tanstack/react-query";
import { LeftPage, MiddlePage, RightPage } from "../_components";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();

  //detail
  const query = useQuery({
    queryKey: ["rescue-request-detail", id],
    queryFn: RESCUE_REQUEST_APIS.getById(id as string),
  });
  const rescueRequestData = query?.data?.data ? query?.data?.data : [];

  if (rescueRequestData.length == 0) return;

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
