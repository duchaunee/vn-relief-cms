import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import "@/styles/custom-shadcn.css";
import { ArrowLeft, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 bg-white",
          "lg:w-[700px] w-full sm:max-w-[700px] h-screen",
          "flex flex-col gap-0 rounded-none lg:max-h-[90vh]"
        )}
        id="modal-container"
      >
        <DialogHeader
          className={cn(
            "text-left flex-none px-6 py-3",
            "bg-gray-200",
            "border-b border-b-gray-300"
          )}
        >
          {isMobile ? (
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-2">
                <ArrowLeft className="w-6 h-6" />
                <DialogTitle className="tracking-tight text-lg font-bold text-primary">
                  {title}
                </DialogTitle>
              </button>
            </DialogTrigger>
          ) : (
            <div className="w-full flex items-center justify-between">
              <DialogTitle className="tracking-tight text-lg font-bold text-primary">
                {title}
              </DialogTitle>
              <DialogTrigger>
                <Button
                  size="icon"
                  className={cn(
                    "text-black bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center shadow-none"
                  )}
                >
                  <X className="!h-7 !w-7" />
                </Button>
              </DialogTrigger>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto lg:px-8 lg:py-8 px-3 py-6">
          {children}
        </div>

        <div className="mt-auto bg-gray-200 w-full py-4 px-6 flex items-center lg:justify-between justify-center border-t border-t-gray-300">
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
      </DialogContent>
    </Dialog>
  );
};

export default ModalContainer;
