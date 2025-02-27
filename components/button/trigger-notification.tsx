import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const ButtonTriggerNotification = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, forwardedRef: React.Ref<HTMLButtonElement>) => {
  const pathname = usePathname();
  const isNotificationPage = pathname === "/thong-bao";
  return (
    <button
      {...props}
      ref={forwardedRef}
      className={cn(
        "size-9 items-center justify-center rounded-sm",
        "relative transition-colors duration-200",
        "text-gray-600",
        "hidden lg:flex",
        "data-[state=open]:text-blue-600 data-[state=open]:bg-blue-50",
        isNotificationPage && "text-blue-600 bg-blue-50 cursor-default"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
        />
      </svg>
    </button>
  );
});

ButtonTriggerNotification.displayName = "ButtonTrigger";
export default ButtonTriggerNotification;
