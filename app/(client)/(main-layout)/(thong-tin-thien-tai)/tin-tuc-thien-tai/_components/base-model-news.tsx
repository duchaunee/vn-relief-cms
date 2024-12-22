import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import "@/styles/custom-shadcn.css";

export const BaseDialog = ({
  isOpen,
  onOpenChange,
  title,
  children,
  className,
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        id="modal-container-news"
        className={cn(
          "w-full lg:max-w-2xl lg:max-h-[85vh] overflow-y-auto bg-white p-0 flex flex-col gap-0 rounded-none h-screen",
          className
        )}
      >
        <DialogHeader className="bg-gray-200 h-fit justify-center px-6 py-4">
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
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <DialogTrigger>
                <Button
                  size="icon"
                  className="text-black bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center shadow-none"
                >
                  <X className="!h-7 !w-7" />
                </Button>
              </DialogTrigger>
            </div>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
