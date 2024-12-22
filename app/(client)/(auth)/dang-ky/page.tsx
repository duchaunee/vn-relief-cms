"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

const reliefActivities = [
  {
    id: "activity-1",
    title: "Tiếp nhận và xử lý xác minh thông tin cần cứu trợ",
    description: "Xác minh và xử lý thông tin từ các nguồn tin cậy",
  },
  // {
  //   id: "activity-2",
  //   title:
  //     "Truyền thông, chia sẻ và cập nhật thông tin với các MTQ cung ứng nguồn cứu trợ",
  //   description: "Kết nối và chia sẻ thông tin với các mạnh thường quân",
  // },
  // {
  //   id: "activity-3",
  //   title:
  //     "Kết nối, cập nhật thông tin với các đội xe hỗ trợ vận chuyển hỗ trợ công tác cứu trợ người dân",
  //   description: "Điều phối và kết nối các đội vận chuyển",
  // },
  // {
  //   id: "activity-4",
  //   title:
  //     "Cập nhật, kết nối thông tin các địa điểm, doanh nghiệp đang mở cửa chung tay hỗ trợ công tác cứu trợ người dân VN",
  //   description: "Quản lý thông tin các điểm tiếp nhận và hỗ trợ",
  // },
  {
    id: "activity-5",
    title: "Cùng tham gia xây dựng hệ thống app VSafe - Cứu trợ thiên tai VN",
    description: "Đóng góp phát triển nền tảng VSafe",
  },
  {
    id: "activity-6",
    title:
      "Hỗ trợ công tác truyền thông, kết nối với các bên tham gia công tác cứu trợ người dân VN",
    description: "Phối hợp truyền thông và kết nối các bên liên quan",
  },
];

const reliefTeams = [
  "Đội xuồng hơi cứu hộ cứu nạn Đà Nẵng",
  "ĐỘI PHẢN ỨNG NHANH (PUN) PUN Pickup & SUV Quảng Bình",
  "Đội SOS đà Nẵng",
  "Nguyễn Mẫn",
  "Hội thiện nguyện 8 Sáng",
  "SOS Quảng Nam",
];

export default function Register() {
  const [selectedActivities, setSelectedActivities] = React.useState<string[]>(
    []
  );
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    facebook: "",
    location: "",
    activities: [] as string[],
    team: "",
    availableTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleActivity = (activityId: string) => {
    const newActivities = selectedActivities.includes(activityId)
      ? selectedActivities.filter((id) => id !== activityId)
      : [...selectedActivities, activityId];

    setSelectedActivities(newActivities);
    setFormData((prev) => ({
      ...prev,
      activities: newActivities,
    }));
  };

  return (
    <div className="w-full p-0 lg:p-4">
      {/* <BackButton text="Đăng nhập nền tảng" onClick={handleBack} /> */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl mx-auto p-6 lg:my-6 bg-white"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Tên của bạn</h2>
              <p className="text-sm text-gray-500">
                Nhập họ tên đầy đủ của bạn
              </p>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Số điện thoại/Zalo</h2>
              <p className="text-sm text-gray-500">
                Số điện thoại để liên lạc khi cần
              </p>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="0123456789"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Link Facebook liên hệ</h2>
              <p className="text-sm text-gray-500">
                Link Facebook cá nhân của bạn
              </p>
              <Input
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="https://facebook.com/username"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Khu vực sinh sống</h2>
              <p className="text-sm text-gray-500">
                Địa chỉ cụ thể nơi bạn đang ở
              </p>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="123 Đường ABC, Phường XYZ, Quận/Huyện, Tỉnh/Thành phố"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-semibold">
              Công tác cứu trợ muốn tham gia
            </h2>
            <p className="text-sm text-gray-500">
              Chọn các hoạt động bạn muốn tham gia
            </p>
            <div className="grid grid-cols-1 gap-4">
              {reliefActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all",
                    selectedActivities.includes(activity.id)
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  )}
                  onClick={() => toggleActivity(activity.id)}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 mt-1">
                        <div
                          className={cn(
                            "w-4 h-4 border border-blue-500 rounded",
                            selectedActivities.includes(activity.id)
                              ? "bg-blue-500"
                              : "bg-white"
                          )}
                        >
                          {selectedActivities.includes(activity.id) && (
                            <div className="flex items-center justify-center h-full text-white text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-base">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">
                Tên Đoàn/Nhóm cứu trợ của bạn
              </h2>
              <p className="text-sm text-gray-500">
                Chọn hoặc thêm mới đoàn/nhóm của bạn
              </p>
              <Input
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="Tên đoàn/nhóm của bạn"
                list="teams"
              />
              <datalist id="teams">
                {reliefTeams.map((team) => (
                  <option key={team} value={team} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">
                Khoảng thời gian rảnh trong ngày của bạn
              </h2>
              <p className="text-sm text-gray-500">
                Cho chúng tôi biết thời gian bạn có thể tham gia
              </p>
              <Input
                name="availableTime"
                value={formData.availableTime}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="Ví dụ: 8h-11h, 14h-17h"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
      </form>
    </div>
  );
}
