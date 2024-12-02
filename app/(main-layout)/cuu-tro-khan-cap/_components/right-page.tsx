import CopyTemplateText from "@/components/copy-template-text/copy-template-text";
import QRCodeWithLogo from "@/components/qr-code/qr-code-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { templateTextRelief } from "@/constants/template-text-relief";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy, Share2 } from "lucide-react";
import { useState } from "react";

const RightPage = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Không thể sao chép. Vui lòng thử lại",
      });
    }
  };
  return (
    <Card className="rounded-sm self-start">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2 pb-3 border-b border-b-gray-300">
          <div className="text-sm text-muted-foreground">
            Thời gian cập nhật
          </div>
          <div className="font-medium">10/30/2024 1:52:52 AM</div>
        </div>

        <div className="!mt-0 py-3 border-b border-b-gray-300">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Link chia sẻ thông tin</div>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="gap-2 w-fit my-1 lg:my-0"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="text-sm text-muted-foreground truncate">
            https://vnrelief.com/cuu-tro-khan-cap/123
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Chia sẻ
            </Button>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-1">
            Mã QR Chia sẻ thông tin
          </div>
          <QRCodeWithLogo />
        </div>

        <CopyTemplateText
          content={templateTextRelief({})}
          title="Mẫu copy chia sẻ thông tin cứu trợ"
        />
      </CardContent>
    </Card>
  );
};

export default RightPage;
