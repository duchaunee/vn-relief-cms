"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ICopyTemplateText {
  content: string;
  title: string;
}

const CopyTemplateText = ({ content, title }: ICopyTemplateText) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      // toast({
      //   description: "Đã sao chép thành công",
      // });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Không thể sao chép. Vui lòng thử lại",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Sao chép
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={content}
        readOnly
        className="min-h-[300px] font-medium resize-none py-0"
      />
    </div>
  );
};

export default CopyTemplateText;
