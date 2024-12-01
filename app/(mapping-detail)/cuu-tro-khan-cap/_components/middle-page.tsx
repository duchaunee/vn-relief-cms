import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";

const Middle = () => {
  return (
    <Card className="rounded-sm self-start">
      <CardHeader className="pb-3">
        <h2 className="text-lg font-medium">
          Tổng hợp hình ảnh tình hình thực tế
        </h2>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed rounded-lg h-[400px] flex items-center justify-center">
          <Button variant="ghost" className="flex flex-col gap-2">
            <ImagePlus className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Thêm ảnh</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Middle;
