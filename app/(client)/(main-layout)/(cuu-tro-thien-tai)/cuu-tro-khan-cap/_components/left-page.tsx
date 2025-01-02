import { Card, CardContent } from "@/components/ui/card";
import { RequestData } from "@/types/models/rescue-request";
import { StatusType } from "@/types/status";
import { findLocation, formatDate, StatusBadge } from "@/utils/helper/common";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Clock, MapPin, Phone, User } from "lucide-react";
import { useParams } from "next/navigation";

const Left = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["rescue-request-detail", id])?.data;

  return (
    <Card className="rounded-sm">
      <CardContent className="p-6">
        <div className="flex-1 flex flex-wrap gap-2 mt-auto lg:h-7">
          {data?.status["verify"] == "pending" ? (
            <StatusBadge status={"verify-pending"} />
          ) : (
            Object.entries(data!.status).map(([key, value]) => {
              const STATUS = `${key}-${value}` as StatusType;
              return <StatusBadge key={key} status={STATUS} />;
            })
          )}
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
              VN{data?._id.slice(0, 3) ?? 1}
            </span>
          </div>
        </div>

        <div className="flex flex-col text-sm gap-1 py-3 border-y border-y-gray-300">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="mt-1">Thời gian gửi tin cần cứu trợ</span>
          </div>
          <p className="font-medium text-base">
            {formatDate(data?.createdAt!)}
          </p>
        </div>

        <div className="">
          <div className="text-sm space-y-1 py-3 border-b border-b-gray-300">
            <h3 className="text-muted-foreground">Tiêu đề cứu trợ</h3>
            <p className="text-base text-red-600 font-medium">{data?.title}</p>
          </div>
          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Địa chỉ cần cứu trợ
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <span className="text-base">{findLocation(data?.wardCode!)}</span>
            </div>
          </div>
          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">Địa chỉ cụ thể</div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <span className="text-base">{data?.address!}</span>
            </div>
          </div>
          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Mô tả tình trạng hiện tại
            </div>
            <p className="text-base text-red-600 font-semibold">
              {data?.description}
            </p>
          </div>

          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Nội dung cần cứu trợ
            </div>
            <div className="text-base">{data?.contentNeedsRelief}</div>
          </div>
          <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
            <Phone className="w-4 h-4" />
            <a
              href={`tel:${data?.priorityPhone}`}
              className="text-base text-blue-600"
            >
              Số ưu tiên: {data?.priorityPhone}
            </a>
          </div>
          <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
            <Phone className="w-4 h-4" />
            <a
              href={`tel:${data?.priorityPhone}`}
              className="text-base text-gray-500"
            >
              Số dự phòng: {data?.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
            <User className="w-5 h-5" />
            <span className="text-base mt-1">
              <p className="text-red-600 inline font-medium">
                {data?.numberOfPeopleNeedingHelp} người
              </p>{" "}
              cần cứu trợ
            </span>
          </div>
          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Người gửi thông tin ?
            </div>
            <div className="text-base">
              {data?.informantId?.name} / {data?.senderType}
            </div>
          </div>
          <div className="space-y-1 py-3 border-b border-b-gray-300">
            <div className="text-sm text-muted-foreground">
              Thành viên tiếp nhận xác minh
            </div>
            <div className="text-base">
              {data?.verifierId ? (
                `VN-RELIEF-${data?.verifierId.phone} / ${data?.verifierId.name}`
              ) : (
                <p className="text-red-600">Chưa có ai tiếp nhận xác minh</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Left;
