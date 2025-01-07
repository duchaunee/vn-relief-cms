"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const StatisticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("rescue-requests");

  // Mock data - thay thế bằng data thực từ API
  const rescueRequestData = [
    { month: "Jan", emergency: 65, supplies: 28, other: 27 },
    { month: "Feb", emergency: 59, supplies: 48, other: 40 },
    { month: "Mar", emergency: 80, supplies: 40, other: 32 },
    { month: "Apr", emergency: 81, supplies: 47, other: 33 },
    { month: "May", emergency: 56, supplies: 39, other: 27 },
    { month: "Jun", emergency: 55, supplies: 48, other: 28 },
  ];

  const rescueTeamData = [
    { name: "Đang hoạt động", value: 45 },
    { name: "Tạm dừng", value: 15 },
    { name: "Chờ xác minh", value: 10 },
  ];

  const volunteerData = [
    { month: "Jan", verified: 40, hotline: 24, collector: 31 },
    { month: "Feb", verified: 30, hotline: 13, collector: 21 },
    { month: "Mar", verified: 20, hotline: 38, collector: 28 },
    { month: "Apr", verified: 27, hotline: 39, collector: 30 },
    { month: "May", verified: 18, hotline: 48, collector: 28 },
    { month: "Jun", verified: 23, hotline: 38, collector: 21 },
  ];

  const contributionData = [
    { name: "Tiền mặt", value: 55 },
    { name: "Vật phẩm", value: 35 },
    { name: "Khác", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold mb-8">Thống kê tổng quan</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "rescue-requests" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("rescue-requests")}
        >
          Đơn cứu trợ
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "rescue-teams" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("rescue-teams")}
        >
          Đội cứu trợ
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "volunteers" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("volunteers")}
        >
          Tình nguyện viên
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "contributions" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("contributions")}
        >
          Đóng góp
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeTab === "rescue-requests" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Thống kê đơn cứu trợ</h2>
            <p className="text-gray-600 mb-4">
              Số lượng đơn cứu trợ theo loại qua các tháng
            </p>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rescueRequestData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emergency"
                    stroke="#8884d8"
                    name="Khẩn cấp"
                  />
                  <Line
                    type="monotone"
                    dataKey="supplies"
                    stroke="#82ca9d"
                    name="Nhu yếu phẩm"
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    stroke="#ffc658"
                    name="Khác"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "rescue-teams" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Thống kê đội cứu trợ</h2>
            <p className="text-gray-600 mb-4">
              Tình trạng hoạt động của các đội cứu trợ
            </p>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rescueTeamData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {rescueTeamData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "volunteers" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Thống kê tình nguyện viên
            </h2>
            <p className="text-gray-600 mb-4">
              Số lượng tình nguyện viên theo vai trò qua các tháng
            </p>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volunteerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="verified" fill="#8884d8" name="TNV Xác minh" />
                  <Bar dataKey="hotline" fill="#82ca9d" name="TNV Hotline" />
                  <Bar dataKey="collector" fill="#ffc658" name="TNV Thu thập" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "contributions" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Thống kê đóng góp</h2>
            <p className="text-gray-600 mb-4">Phân bổ các hình thức đóng góp</p>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {contributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsDashboard;
