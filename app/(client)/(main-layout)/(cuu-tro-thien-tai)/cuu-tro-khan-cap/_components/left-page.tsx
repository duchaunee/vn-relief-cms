import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/utils/helper/common";
import { Check, Clock, MapPin, Phone, User } from "lucide-react";

const Left = () => {
  return (
    <Card className="rounded-sm">
      <CardContent className="p-6">
        <div className="flex-1 flex flex-wrap gap-2 mt-auto lg:h-7">
          <StatusBadge status="Đã xác minh" />
          <StatusBadge status="Đang tìm đội cứu trợ" />
        </div>
        <div className="flex flex-col items-start gap-2 py-3">
          <span className="text-gray-400 text-sm italic space-x-1">
            id của thông tin, chia sẻ kèm id khi lan truyền để kiểm tra tại{" "}
            <strong className="font-bold">vnrelief.com</strong>
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-green-500 inline-flex items-center gap-1.5 p-1 text-sm font-medium border rounded-full">
              <Check className="w-5 h-5 text-white" />
            </span>
            <span className="text-2xl text-green-500 font-bold mt-[2px]">
              VN133
            </span>
          </div>
        </div>

        <div className="flex flex-col text-sm gap-1 py-3 border-y border-y-gray-300">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="mt-1">Thời gian gửi tin cần cứu trợ</span>
          </div>
          <p className="font-medium text-base">10/29/2024 10:21:23 AM</p>
        </div>

        <div className="">
          <div className="text-sm space-y-1 py-3 border-b border-b-gray-300">
            <h3 className="text-muted-foreground">Cập nhật tiến độ cứu trợ</h3>
            <p className="text-base text-red-600 font-medium">
              Nước trong nhà ngang đầu gối. 1 đứa lớp 3 1 đứa 2 tuổi ruỗi. Đồ ăn
              còn đi trì được 2 ngày.
            </p>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Khu vực cần cứu trợ
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <span className="text-base">
                Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình
              </span>
            </div>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Mô tả tình trạng hiện tại
            </div>
            <p className="text-base text-red-600 font-semibold">
              Nhà bạn em ở Đội 2, thôn Quy Hậu, Liên Thủy, Lệ Thủy đang có 6
              người bị kẹt (2 người già và 2 trẻ em), hiện tại gần hết pin và
              hết lương thực, đoàn nào ở đó xin hỗ trợ bạn em với ạ.nhà Ông Mai
              Xuân Hiếu
            </p>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Nội dung cần cứu trợ
            </div>
            <div className="text-base">Hỗ trợ di dời</div>
          </div>

          <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
            <Phone className="w-4 h-4" />
            <a href="tel:0989445450" className="text-base text-blue-600">
              0989445450
            </a>
          </div>

          <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
            <User className="w-5 h-5" />
            <span className="text-base mt-1">
              <p className="text-red-600 inline font-medium">6 người</p> cần cứu
              trợ
            </span>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Người gửi thông tin ?
            </div>
            <div className="text-base">Gửi giúp tin cứu trợ</div>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Thành viên tiếp nhận xử lý
            </div>
            <div className="text-base">VN-RELIEF-0912316304</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Left;
