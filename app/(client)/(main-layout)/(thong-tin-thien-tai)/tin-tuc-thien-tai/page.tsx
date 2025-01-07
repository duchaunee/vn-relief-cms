"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import RoleBadge from "@/components/badge-custom/badge-role";
import { BaseDialog } from "./_components/base-model-news";
import { PostForm } from "./_components/post-form";

export default function Page() {
  const newsItems = [
    {
      id: 1,
      title: "Lũ lụt nghiêm trọng tại khu vực miền Trung",
      description:
        "Mưa lớn đã gây ra lũ lụt lan rộng, ảnh hưởng đến nhiều huyện... ",
      severity: "cao",
      affectedHouseholds: 150,
      location: {
        ward: "Phường A",
        district: "Quận 1",
        province: "Tỉnh Miền Trung",
      },
      images: [
        "https://lh3.googleusercontent.com/d/19Fn5uezT-bM3CgUO0-faji-F9wrMIaky",
      ],
      reporter: {
        name: "Anh Minh",
        avatar: "/api/placeholder/40/40",
        role: 0,
        timestamp: "2024-03-15T10:30:00",
      },
    },
    // ... các mục tin khác
  ];

  const [selectedNews, setSelectedNews] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewDetails = (news) => {
    setSelectedNews(news);
    setIsViewDialogOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitting post...");
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="w-full h-full px-1 py-2 lg:py-4 lg:px-20 bg-white">
      <div className="mx-auto px-4 py-6 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">
              Cập nhật tình hình thiên tai
            </h1>
            <p className="text-sm text-muted-foreground">
              Danh sách tình hình thiên tai do người dân cung cấp và được xác
              minh bởi các tình nguyện viên
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Đăng bài viết
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col cursor-pointer"
              onClick={() => handleViewDetails(item)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow text-sm">
                <img
                  src={item.images[0]}
                  alt="Disaster scene"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Địa điểm:</span>
                    <span>{`${item.location.ward}, ${item.location.district}, ${item.location.province}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      Số hộ bị ảnh hưởng (ước tính):
                    </span>
                    <span>{item.affectedHouseholds}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 rounded-b-lg py-2">
                <div className="flex items-center gap-3 w-full">
                  <Avatar>
                    <AvatarImage src={item.reporter.avatar} />
                    <AvatarFallback>{item.reporter.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1">
                      <p className="text-base font-medium">
                        {item.reporter.name}
                      </p>
                      {/* <RoleBadge roleCode={item.reporter.role} /> */}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.reporter.timestamp)}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* View Details Dialog */}
      {selectedNews && (
        <BaseDialog
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          title={selectedNews.title}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="my-4 space-y-4 px-6">
              <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Địa điểm:</span>
                  <span>{`${selectedNews.location.ward}, ${selectedNews.location.district}, ${selectedNews.location.province}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Số hộ bị ảnh hưởng:</span>
                  <span>{selectedNews.affectedHouseholds} hộ</span>
                </div>
              </div>

              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-medium mb-2">Chi tiết tình hình</h3>
                <p>{selectedNews.description}</p>
              </div>

              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-medium mb-3">Hình ảnh thiệt hại</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedNews.images.map((image, index) => (
                    <div key={index} className="aspect-video relative">
                      <img
                        src={image}
                        alt={`Hình ảnh thiệt hại ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-gray-200 flex items-center gap-3 px-6 py-4">
            <Avatar>
              <AvatarImage src={selectedNews.reporter.avatar} />
              <AvatarFallback>{selectedNews.reporter.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex items-center gap-1">
                <p className="text-base font-medium">
                  {selectedNews.reporter.name}
                </p>
                {/* <RoleBadge roleCode={selectedNews.reporter.role} /> */}
              </div>
              <p className="text-xs text-gray-500">
                {formatDate(selectedNews.reporter.timestamp)}
              </p>
            </div>
          </div>
        </BaseDialog>
      )}

      {/* Create Post Dialog */}
      <BaseDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title="Đăng bài viết mới"
      >
        <PostForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateDialogOpen(false)}
        />
      </BaseDialog>
    </div>
  );
}
