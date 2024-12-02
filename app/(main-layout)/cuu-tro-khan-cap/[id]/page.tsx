import { LeftPage, MiddlePage, RightPage } from "../_components";

export default function RescueRequest() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Request Details */}
        <LeftPage />

        {/* Middle Column - Image Upload */}
        <MiddlePage />

        {/* Right Column - Share & Status */}
        <RightPage />
      </div>
    </div>
  );
}
