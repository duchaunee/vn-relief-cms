"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const roleConfig = {
  "Y tế": { color: "text-green-500", bgColor: "bg-green-500/10" },
  "Cứu hộ": { color: "text-red-500", bgColor: "bg-red-500/10" },
  "Bảo vệ": { color: "text-blue-500", bgColor: "bg-blue-500/10" },
  "Quản lý": { color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
};

const contacts: {
  name: string;
  role: keyof typeof roleConfig;
  phone: string;
}[] = [
  {
    name: "Frances Guerrero",
    role: "Y tế",
    phone: "0912345678",
  },
  {
    name: "Lori Ferguson",
    role: "Cứu hộ",
    phone: "0923456789",
  },
  {
    name: "Samuel Bishop",
    role: "Bảo vệ",
    phone: "0934567890",
  },
  {
    name: "Dennis Barrett",
    role: "Y tế",
    phone: "0945678901",
  },
  {
    name: "Judy Nguyen",
    role: "Quản lý",
    phone: "0956789012",
  },
  {
    name: "Judy Nguyen",
    role: "Quản lý",
    phone: "0956789012",
  },
  {
    name: "Judy Nguyen",
    role: "Quản lý",
    phone: "0956789012",
  },
  {
    name: "Judy Nguyen",
    role: "Quản lý",
    phone: "0956789012",
  },
];

const EmergencyContacts = () => {
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <React.Fragment>
      {/* tạo 1 thẻ div với width bằng với Cart để trông như "fixed" vẫn chiếm diện tích */}
      <div className="w-72"></div>
      <Card className="fixed top-4 right-4 w-72 bg-header text-header-foreground mt-14 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Liên hệ khẩn cấp
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {contacts.map((contact, index) => {
            const { color, bgColor } = roleConfig[contact.role] || {
              color: "text-gray-500",
              bgColor: "bg-gray-500/10",
            };

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium leading-none">
                        {contact.name}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${bgColor} ${color}`}
                            >
                              {contact.role}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vai trò: {contact.role}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Liên hệ: <strong>{contact.phone}</strong>
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary"
                  onClick={() => handleCall(contact.phone)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
          <Button
            variant="secondary"
            className="w-full text-xs text-secondary-foreground"
          >
            Xem thêm
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default EmergencyContacts;
