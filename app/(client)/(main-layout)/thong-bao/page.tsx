import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function NotificationPage() {
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

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="w-full lg:max-w-3xl mx-auto lg:px-8 lg:py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Notification Tabs */}
          <div className="lg:block hidden border-b border-gray-200">
            <div className="px-4 sm:px-6 flex space-x-8">
              <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                Tất cả thông báo
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors duration-150",
                  notification.unread && "bg-blue-50/40"
                )}
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={notification.avatar} alt="" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900 leading-5 font-medium">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
