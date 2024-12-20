"use client";

import RequestReliefContext from "@/providers/app-context-provider/request-relief-provider";
import { DisasterReliefDashboard } from "./_components/mapping-detail-ui/disaster-relief-dashboard";

const SAMPLE_LOCATIONS = [
  {
    name: "Quế Võ, Bắc Ninh",
    count: 4,
    // ma xa
    // ma huyen
    // ma tinh
    coordinates: {
      lat: 17.1234,
      lng: 106.5678,
    },
    groupRequest: [
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
      {
        id: 2,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
    ],
  },
  {
    name: "Hà Nội",
    count: 4,
    // ma xa
    // ma huyen
    // ma tinh
    coordinates: {
      lat: 17.1234,
      lng: 106.5678,
    },
    groupRequest: [
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
    ],
  },
  {
    name: "Hà Nội",
    count: 4,
    // ma xa
    // ma huyen
    // ma tinh
    coordinates: {
      lat: 17.1234,
      lng: 106.5678,
    },
    groupRequest: [
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
      {
        id: 1,
        status: "Đang chờ xác minh",
        name: "Có đội cứu hộ nào bên Hà Can- Thượng Phong xin giúp đỡ...",
        address: "Xã Liên Thủy, Huyện Lệ Thủy, Tỉnh Quảng Bình",
        description: "Áo phao thiếu 1000 cái dự phòng cho thời gian tới",
        imageUrl:
          "https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fHww",
      },
    ],
  },
];

const titleList = {
  title: "Danh sách các nơi đang cần hỗ trợ sau thiên tai",
  button: "Tạo yêu cầu hỗ trợ",
};

export default function Page() {
  return (
    <RequestReliefContext>
      <DisasterReliefDashboard
        titleList={titleList}
        locations={SAMPLE_LOCATIONS}
      />
    </RequestReliefContext>
  );
}
