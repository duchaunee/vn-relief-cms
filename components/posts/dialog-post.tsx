"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PostDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export function PostDialog({ open, setOpen, children }: PostDialogProps) {
  return (
    <div className="">
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-fit p-0">
          <DialogHeader className="text-center py-4 w-full mx-auto bg-sidebar">
            Anonymous participant's post
          </DialogHeader>
          <div className="[&>*]:border-0 [&>*]:shadow-none [&>*]:md:w-[700px]">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
