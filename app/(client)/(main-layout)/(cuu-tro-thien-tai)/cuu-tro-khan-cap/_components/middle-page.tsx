import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RequestData } from "@/types/models/rescue-request";
import { RescueRequestItem } from "@/types/models/rescue-request-item";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Middle = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["rescue-request-detail", id])?.data;

  console.log("\n🔥 ~ file: middle-page.tsx:15 ~ data::\n", data);

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Các đoàn hỗ trợ cho trường hợp này
          </h2>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg py-10 flex items-center justify-center">
            <span>Chưa có đoàn nào</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn("mt-4 border border-gray-300 bg-gray-200")}
          >
            Đăng ký cứu trợ
            <ArrowRight className="w-6 h-6" />
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">
            Tổng hợp hình ảnh tình hình thực tế
          </h2>
        </CardHeader>
        <CardContent>
          {data?.images.length > 0 ? (
            <div className="flex gap-2">
              {data?.images.map((image) => (
                <a
                  href={image}
                  target="_blank"
                  className="border-2 border-dashed border-gray-300 rounded-lg w-[150px] h-[150px] aspect-square flex items-center justify-center lg:hover:border-gray-500 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt=""
                    width={150}
                    height={150}
                    className="text-muted-foreground object-cover"
                  ></Image>
                </a>
              ))}
            </div>
          ) : (
            "Không có hình ảnh"
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Middle;
