import { Heart, Phone, Users, MapPin } from "lucide-react";
import Image from "next/image";

// Mock data - replace with API fetch later
const statsData = {
  volunteers: 250,
  callsPerDay: 1410,
  peopleSaved: 2000,
  locationsHelped: 4,
};

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      icon: Heart,
      value: statsData.volunteers,
      label: "Tình nguyện viên",
    },
    {
      id: 2,
      icon: Phone,
      value: statsData.callsPerDay,
      label: "Cuộc gọi đến/ngày",
    },
    {
      id: 3,
      icon: Users,
      value: statsData.peopleSaved,
      label: "Số người được giúp",
    },
    {
      id: 4,
      icon: MapPin,
      value: statsData.locationsHelped,
      label: "Địa phương được giúp",
    },
  ];

  return (
    <section className="w-full h-full bg-white">
      {/* Intro Section */}
      <div className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto lg:px-4 px-8 flex flex-col lg:flex-row items-center gap-8">
          {/* Left content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-blue-600 font-medium">
                Về chúng tôi
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                GIỚI THIỆU VỀ VIỆT NAM RELIEF
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed">
              VNRelief – Mạng lưới Thông tin Cứu nạn Khẩn cấp là hệ thống kết
              nối nhanh chóng các nguồn lực với những người cần trợ giúp trong
              các tình huống khẩn cấp, đặc biệt khi xảy ra thiên tai. Mạng lưới
              sử dụng công nghệ, dữ liệu để tối ưu hóa các hoạt động cứu trợ,
              giúp quá trình phân hồi diễn ra nhanh chóng và hiệu quả hơn.
            </p>

            <div className="space-y-4">
              <p className="text-gray-600">
                Thông qua đường dây nóng 18006132 và quét thông tin kiều của tờ
                mạng xã hội, ERIN tiếp nhận yêu cầu hỗ trợ và kết nối với các
                đơn vị cứu trợ phù hợp. Đội ngũ tình nguyện viên trực tuyến của
                ERIN xác minh thông tin và chuyển đến cơ quan chức năng tại địa
                phương để thực hiện cứu hộ kịp thời.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-medium text-gray-900">
                Người dân có thể tham gia hỗ trợ cứu hộ bằng cách:
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Cung cấp thông tin về các trường hợp cần cứu trợ hoặc đơn vị
                  cứu hộ.
                </li>
                <li>
                  Tham gia làm tình nguyện viên tổng hợp và xác minh thông tin.
                </li>
                <li>
                  Các đơn vị cứu hộ có thể cập nhật thông tin hoạt động và phối
                  hợp hiệu quả qua trang thông tin của hội miễn phí.
                </li>
              </ul>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
              <Image
                src="/api/placeholder/800/600"
                alt="ERIN Emergency Response"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-4 px-8 ">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#1C3694] rounded-lg p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold flex items-center">
                    <span className="text-xl mr-1">+</span>
                    <span>{stat.value.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
