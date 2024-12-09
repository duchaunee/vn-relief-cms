import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonTriggerNotification from "../button/trigger-notification";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Notification() {
  const notifications = [
    {
      id: 1,
      avatar: "/placeholder.svg?height=32&width=32",
      title: "Your order is placed",
      description: "Amet minim mollit non deser unt ullamco est s...",
      time: "2 ngày trước",
      unread: false,
    },
    {
      id: 2,
      avatar: "/placeholder.svg?height=32&width=32",
      title: "Congratulations Darlene 🎉",
      description: "Won the monthly best seller badge",
      time: "1 tiếng trước",
      unread: true,
    },
    {
      id: 3,
      avatar: "/placeholder.svg?height=32&width=32",
      title: "Joaquina Weisenborn",
      description: "Soufflé soufflé caramels sweet roll...",
      time: "Vừa xong",
      unread: true,
    },
    {
      id: 4,
      avatar: "/placeholder.svg?height=32&width=32",
      title: "Brooklyn Simmons",
      description: "Added you to Top Secret Project...",
      time: "1 giờ trước",
      unread: true,
    },
    {
      id: 5,
      avatar: "/placeholder.svg?height=32&width=32",
      title: "Margot Henschke",
      description: "Cake pie jelly jelly beans. Marzipan lemon...",
      time: "3 giờ trước",
      unread: false,
    },
  ];

  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isNotificationPage = pathname === "/thong-bao";

  if (isNotificationPage) {
    return <ButtonTriggerNotification />;
  }

  if (isMobile)
    return (
      <Link href="/thong-bao" className="hidden lg:block">
        <ButtonTriggerNotification />
      </Link>
    );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ButtonTriggerNotification />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[320px] bg-white rounded-lg shadow-lg p-0 hidden lg:block"
        sideOffset={8}
      >
        <div className="w-full">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-medium text-gray-900">Thông báo</h3>
            <Link href="/thong-bao" className="text-xs text-blue-600 underline">
              Xem tất cả
            </Link>
          </div>
          <div className="max-h-[400px] overflow-y-auto divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-4 hover:bg-gray-50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={notification.avatar} alt="" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900 leading-5">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
