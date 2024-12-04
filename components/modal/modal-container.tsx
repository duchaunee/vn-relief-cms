import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import "@/styles/custom-shadcn.css";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalContainer = ({
  open,
  onOpenChange,
  title,
  children,
}: ModalProps) => {
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
          "data-[state=closed]:duration-200 data-[state=open]:duration-200",
          "transition-transform duration-200",
          "p-0",
          "lg:w-[750px] w-full sm:max-w-[800px] h-screen", // Thêm h-screen
          "flex flex-col" // Thêm flex layout
        )}
        id="modal-container"
      >
        {title && (
          <SheetHeader className=" text-left flex-none px-8 lg:px-12 pt-8 lg:pb-0">
            {title && <SheetTitle>{title}</SheetTitle>}
          </SheetHeader>
        )}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 lg:pt-0">
          {children}
        </div>
        <div className="absolute bottom-0 right-0 bg-gray-200 w-full py-4 px-6 flex items-center justify-between border-t border-t-gray-300">
          <span className="italic text-[13px] text-gray-500">
            Việc gửi đơn sẽ cần xác minh đề phòng trường hợp giả mạo
          </span>
          <div className="flex gap-4 items-center">
            <Button variant="outline" className="px-6 py-4">
              Lưu bản nháp
            </Button>
            <Button className="px-6 py-4 bg-red-500 hover:bg-red-600">
              Gửi đơn cứu trợ
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModalContainer;
