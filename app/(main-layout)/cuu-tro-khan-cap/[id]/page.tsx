"use client";

import { LeftPage, MiddlePage, RightPage } from "../_components";

export default function RescueRequest() {
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
