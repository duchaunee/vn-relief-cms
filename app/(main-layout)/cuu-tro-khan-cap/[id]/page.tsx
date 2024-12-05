"use client";

import BackButton from "@/components/button/back-header";
import { LeftPage, MiddlePage, RightPage } from "../_components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RescueRequest() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/cuu-tro-khan-cap");
  };

  useEffect(() => {
    router.prefetch("/cuu-tro-khan-cap");
  }, [router]);

  return (
    <div className="w-full p-0 lg:p-4">
      <BackButton text="Thông tin cần cứu trợ VN133" onClick={handleBack} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LeftPage />
        <MiddlePage />
        <RightPage />
      </div>
    </div>
  );
}
