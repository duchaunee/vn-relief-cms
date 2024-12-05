import RescueIcon from "@/components/icon/rescue-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, HandHeart, HeartHandshake, ImagePlus } from "lucide-react";

const Middle = () => {
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
          <button className="border-2 border-dashed border-gray-300 rounded-lg h-[150px] aspect-square flex items-center justify-center lg:hover:border-gray-500">
            <div className="flex flex-col items-center gap-2 p-2">
              <ImagePlus className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                Thêm ảnh
              </span>
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Middle;
