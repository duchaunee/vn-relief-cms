import BackButton from "@/components/button/back-header";
import { LeftPage, MiddlePage, RightPage } from "../_components";

export default function RescueRequest() {
  return (
    <div className="w-full p-0 lg:p-4">
      <BackButton text="Các nơi đang cần cứu trợ khẩn cấp" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LeftPage />
        <MiddlePage />
        <RightPage />
      </div>
    </div>
  );
}
