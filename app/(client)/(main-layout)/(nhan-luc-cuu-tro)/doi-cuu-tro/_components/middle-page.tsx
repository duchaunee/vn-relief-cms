import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EmptyData from "@/constants/empty-data";
import { cn } from "@/lib/utils";
import { RequestData } from "@/types/models/rescue-request";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CloudOff, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Middle = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const data = queryClient.getQueryData<{
    data: RequestData;
  }>(["rescue-teams-detail", id])?.data;

  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">Các thành viên trong đội</h2>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            className={cn("mt-4 border border-gray-300 bg-gray-200")}
          >
            Đăng ký thành viên
            <ArrowRight className="w-6 h-6" />
          </Button>
          {/* {data?.images.length > 0 ? (
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
                    className="text-muted-foreground object-contain"
                  ></Image>
                </a>
              ))}
            </div>
          ) : (
            "Không có hình ảnh"
          )} */}
        </CardContent>
      </Card>
      {/* <Card className="w-full rounded-sm">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-medium">Lịch trình hoạt động của đội</h2>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg py-10 flex items-center justify-center">
            <span>Chưa có lịch trình</span>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Middle;
