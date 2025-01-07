"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

const RescueTeamDashboard = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    teamName: "",
    operationType: "",
    phone: "",
    supportCapability: "",
    wardCode: "",
    members: [],
  });
  const [rescueTeams, setRescueTeams] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([
    { id: 1, name: "Phạm Văn D", phone: "0123456780", status: "pending" },
    { id: 2, name: "Hoàng Thị E", phone: "0987654322", status: "pending" },
  ]);
  const [newMember, setNewMember] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTeam({
      teamName: "",
      operationType: "",
      phone: "",
      supportCapability: "",
      wardCode: "",
      members: [],
    });
    setNewMember("");
  };

  const handleInputChange = (e) => {
    setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      setNewTeam({
        ...newTeam,
        members: [...newTeam.members, newMember.trim()],
      });
      setNewMember("");
    }
  };

  const handleRemoveMember = (member) => {
    setNewTeam({
      ...newTeam,
      members: newTeam.members.filter((m) => m !== member),
    });
  };

  const handleCreateTeam = () => {
    if (
      newTeam.teamName &&
      newTeam.operationType &&
      newTeam.phone &&
      newTeam.supportCapability &&
      newTeam.wardCode
    ) {
      setRescueTeams([
        ...rescueTeams,
        { ...newTeam, id: rescueTeams.length + 1, status: "inactive" },
      ]);
      closeModal();
      toast.success("Đội cứu trợ đã được tạo thành công!");
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const handleApproval = (id, status) => {
    setApprovalRequests(
      approvalRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    if (status === "approved") {
      toast.success("Yêu cầu tham gia đội đã được chấp thuận.");
    } else {
      toast.success("Yêu cầu tham gia đội đã bị từ chối.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="manage">Quản lý đội cứu trợ</TabsTrigger>
          <TabsTrigger value="approval">Phê duyệt đội cứu trợ</TabsTrigger>
        </TabsList>
        <TabsContent value="manage" className="mt-4">
          <Card>
            <CardHeader className="flex">
              <CardTitle>Danh sách đội cứu trợ</CardTitle>
              <Button onClick={openModal} className="ml-auto w-fit">
                Tạo đội cứu trợ
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Danh sách các đội cứu trợ</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã đội</TableHead>
                    <TableHead>Tên đội</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Địa bàn hoạt động</TableHead>
                    <TableHead>Loại hình hoạt động</TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescueTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.id}</TableCell>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell>{team.phone}</TableCell>
                      <TableCell>{team.wardCode}</TableCell>
                      <TableCell>{team.operationType}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            team.status === "active" ? "default" : "secondary"
                          }
                        >
                          {team.status === "active"
                            ? "Hoạt động"
                            : "Chưa xác minh"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approval" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách yêu cầu tham gia đội</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Yêu cầu tham gia các đội cứu trợ</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvalRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.id}
                      </TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "pending"
                              ? "secondary"
                              : request.status === "approved"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {request.status === "pending"
                            ? "Chờ duyệt"
                            : request.status === "approved"
                            ? "Đã duyệt"
                            : "Từ chối"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() =>
                                handleApproval(request.id, "approved")
                              }
                            >
                              Chấp nhận
                            </Button>{" "}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleApproval(request.id, "rejected")
                              }
                            >
                              Từ chối
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* <DialogTrigger asChild>
          <Button onClick={openModal}>Tạo đội cứu trợ</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Tạo đội cứu trợ mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin về đội cứu trợ mới.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamName" className="text-right">
                Tên đội
              </Label>
              <Input
                id="teamName"
                name="teamName"
                value={newTeam.teamName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="operationType" className="text-right">
                Loại hình hoạt động
              </Label>
              <Input
                id="operationType"
                name="operationType"
                value={newTeam.operationType}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                name="phone"
                value={newTeam.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supportCapability" className="text-right">
                Khả năng hỗ trợ
              </Label>
              <Input
                id="supportCapability"
                name="supportCapability"
                value={newTeam.supportCapability}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wardCode" className="text-right">
                Địa bàn hoạt động
              </Label>
              <Input
                id="wardCode"
                name="wardCode"
                value={newTeam.wardCode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="members" className="text-right">
                Thành viên
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="members"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Nhập số điện thoại thành viên"
                />
                <Button type="button" onClick={handleAddMember}>
                  Thêm
                </Button>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-wrap gap-2">
                {newTeam.members.map((member) => (
                  <Badge
                    key={member}
                    variant="secondary"
                    className="flex items-center"
                  >
                    {member}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveMember(member)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Hủy
            </Button>
            <Button onClick={handleCreateTeam}>Tạo đội</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RescueTeamDashboard;
