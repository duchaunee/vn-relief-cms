import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import "@/styles/custom-shadcn.css";
import { ArrowLeft, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => boolean;
  title?: string;
  description?: string;
  button?: {
    primary: string;
    secondary: string;
  };
  children: React.ReactNode;
  formId?: string;
}

const ModalContainer = ({
  open,
  onOpenChange,
  title,
  description,
  button,
  children,
  formId,
}: ModalProps) => {
  const isMobile = useIsMobile();

  /**
   * ==== Solution 1: useEffect
   *
   * Tại sao cần setTimeout?
   * Do Sheet của Radix là render Portal, nó cần đợi DOM render xong thì mới render
   * Nếu không có setTimeout thì DOM render --> chạy useEffect --> không có id #modal-container do * Portal chưa render
   */
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const closeRadix = document.querySelector("#modal-container > button");
  //     // closeRadix?.remove();
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, [open]);

  /**
   * ==== Solution 2: Override css button :D
   */

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className={cn(
          "transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          "p-0 bg-white",
          "lg:w-[700px] w-full sm:max-w-[700px] h-screen", // Thêm h-screen
          "flex flex-col gap-0" // Thêm flex layout
        )}
        id="modal-container"
      >
        <SheetHeader
          className={cn(
            "text-left flex-none px-6 py-3",
            "bg-gray-200",
            "border-b border-b-gray-300"
          )}
        >
          {isMobile ? (
            <SheetTrigger asChild>
              <button className="w-full flex items-center gap-2">
                <ArrowLeft className="w-6 h-6" />
                <SheetTitle className="tracking-tight text-lg font-bold text-primary">
                  {title}
                </SheetTitle>
              </button>
            </SheetTrigger>
          ) : (
            <div className="w-full flex items-center justify-between">
              <SheetTitle className="tracking-tight text-lg font-bold text-primary">
                {title}
              </SheetTitle>
              <SheetTrigger>
                <Button
                  size="icon"
                  className={cn(
                    "text-black bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center shadow-none"
                  )}
                >
                  <X className="!h-7 !w-7" />
                </Button>
              </SheetTrigger>
            </div>
          )}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto lg:px-8 lg:py-8 px-3 py-6">
          {children}
        </div>
        <div className="sticky bottom-0 right-0 bg-gray-200 w-full py-4 px-6 flex items-center lg:justify-between justify-center border-t border-t-gray-300">
          <span className="italic text-[13px] text-gray-500 hidden lg:block">
            {description}
          </span>
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="px-6 py-4 bg-white">
              {button?.secondary}
            </Button>
            <Button
              type="submit"
              form={formId}
              className="px-6 py-4 bg-red-500 hover:bg-red-600"
            >
              {button?.primary}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModalContainer;
