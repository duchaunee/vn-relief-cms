import { useState } from "react";
import {
  Bell,
  BellOff,
  Check,
  X,
  Clock,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mergeClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

type NotificationType = "message" | "mention" | "update" | "reminder";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  sender?: {
    name: string;
    avatar: string;
  };
};

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      title: "New Message",
      message: "Sarah: Hey! Just checking in about the project...",
      time: "2m",
      read: false,
      sender: {
        name: "Sarah Wilson",
        avatar: "/api/placeholder/32/32",
      },
    },
    {
      id: 2,
      type: "mention",
      title: "Mentioned You",
      message: "@alex mentioned you in Design Team",
      time: "1h",
      read: false,
    },
    {
      id: 3,
      type: "update",
      title: "System Update",
      message: "New features available! Check out what's new",
      time: "5h",
      read: true,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    },
    {
      id: 4,
      type: "reminder",
      title: "Meeting Reminder",
      message: "Team standup in 30 minutes",
      time: "25m",
      read: false,
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "mention":
        return <User className="h-4 w-4 text-purple-500" />;
      case "update":
        return <Settings className="h-4 w-4 text-green-500" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={mergeClasses(
            "relative bg-icon transition-colors duration-200",
            "bg-icon text-icon-foreground",
            "hover:bg-icon-hover/background hover:text-icon-hover/foreground",
            "data-[state=open]:text-icon-hover/foreground",
          )}
        >
          <Bell className="h-5 w-5"/>
          {unreadCount > 0 && (
            <Badge className="absolute -top-[6px] -right-[6px] h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs transition-all animate-in zoom-in duration-200 px-1.5 hover:bg-red-500" >
              {/* {unreadCount > 2 ? "99+" : unreadCount} */}
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[380px] p-2 m-[5px] bg-notification text-sidebar-foreground border-sidebar-border scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-sidebar rounded-xl shadow-lg"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sidebar-foreground">
              Notifications
            </h4>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="bg-sidebar-border" />
        <div className="max-h-[360px] overflow-y-auto px-1 py-1 scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-sidebar">
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={mergeClasses(
                    "flex gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    !notification.read ? "bg-sidebar-accent/30" : ""
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={mergeClasses(
                          "text-sm",
                          !notification.read ? "font-medium" : ""
                        )}
                      >
                        {notification.title}
                      </span>
                      <span className="text-xs text-sidebar-foreground/60 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-sidebar-foreground/80 line-clamp-2">
                      {notification.message}
                    </p>
                    {notification.type === "message" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                        >
                          Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          View
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellOff className="h-12 w-12 text-sidebar-foreground/50 mb-3" />
              <p className="text-sm text-sidebar-foreground/60">
                No new notifications
              </p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator className="bg-sidebar-border" />
        <div className="p-2">
          <Button
            variant="outline"
            className={cn(
              "w-full text-xs border-sidebar-border text-center",
              "bg-icon text-icon-foreground",
              "hover:bg-icon hover:text-icon-hover/foreground"
            )}
            size="sm"
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
