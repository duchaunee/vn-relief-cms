"use client";
import React, { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, MoreVertical, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { TEAM_RESCUE_REQUEST_APIS } from "@/apis/team-rescue-request";
import { RESCUE_REQUEST_APIS } from "@/apis/rescue-request";
import { getNaturalDisasterFromCookies } from "@/utils/auth";

const RescueTeamDashboard = () => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [selectedTeamToVerify, setSelectedTeamToVerify] = useState(null);

  const handleVerifyTeam = async () => {
    try {
      setLoading(true);
      await RESCUE_TEAMS_APIS.update(selectedTeamToVerify, {
        status: "active",
      });

      toast.success("Đã duyệt đội cứu trợ thành công");
      setIsVerifyModalOpen(false);
      fetchRescueTeams();
    } catch (error) {
      toast.error("Lỗi khi duyệt đội cứu trợ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //===============================

  const [activeTab, setActiveTab] = useState("manage");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [rescueTeams, setRescueTeams] = useState([]);
  const [rescueRequests, setRescueRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTeam, setNewTeam] = useState({
    teamName: "",
    operationType: "",
    phone: "",
    supportCapability: "",
    wardCode: "",
    memberPhones: [""], // Array để lưu danh sách số điện thoại thành viên
  });

  useEffect(() => {
    fetchRescueTeams();
  }, [activeTab]);

  const fetchRescueTeams = async () => {
    try {
      setLoading(true);
      const response = await RESCUE_TEAMS_APIS.getAll(
        activeTab === "manage" ? "active" : "deactive"
      )();
      setRescueTeams(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu đội cứu trợ");
    } finally {
      setLoading(false);
    }
  };

  const fetchVerifiedRescueRequests = async () => {
    try {
      const response = await RESCUE_REQUEST_APIS.getAll("active")();
      setRescueRequests(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách đơn cứu trợ");
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (
        !newTeam.teamName ||
        !newTeam.operationType ||
        !newTeam.phone ||
        !newTeam.supportCapability ||
        !newTeam.wardCode
      ) {
        console.log("ádas");
        return toast.error("Vui lòng điền đầy đủ thông tin đội cứu trợ");
      }

      // Validate phone numbers
      const validPhones = newTeam.memberPhones.filter(
        (phone) => phone.trim() !== ""
      );
      if (validPhones.length === 0) {
        return toast.error(
          "Vui lòng thêm ít nhất một số điện thoại thành viên"
        );
      }

      setLoading(true);

      // 1. Create rescue team first
      const createdTeam = await RESCUE_TEAMS_APIS.save({
        naturalDisasterId: getNaturalDisasterFromCookies()._id,
        teamName: newTeam.teamName,
        operationType: newTeam.operationType,
        phone: newTeam.phone,
        supportCapability: newTeam.supportCapability,
        wardCode: newTeam.wardCode,
        status: "active", //TNV tao dc active luon
      });

      // 2. Add members one by one
      const addMemberPromises = validPhones.map((phone) =>
        RESCUE_TEAMS_APIS.addTeamMember(createdTeam.data.data._id)({
          phone: phone.trim(),
        })
      );

      await Promise.all(addMemberPromises);

      toast.success("Tạo đội cứu trợ và thêm thành viên thành công");
      setIsCreateModalOpen(false);
      fetchRescueTeams();
      resetForm();
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(error?.response?.data?.message || "Lỗi khi tạo đội cứu trợ");
    } finally {
      setLoading(false);
    }
  };

  // Reset form function also needs to be updated
  const resetForm = () => {
    setNewTeam({
      teamName: "",
      operationType: "",
      phone: "",
      supportCapability: "",
      wardCode: "",
      memberPhones: [""], // Reset member phones array to one empty field
    });
  };

  const handleAssignTeam = async (teamId) => {
    setSelectedTeamId(teamId);
    await fetchVerifiedRescueRequests();
    setIsAssignModalOpen(true);
  };

  const handleSaveAssignments = async () => {
    try {
      if (!selectedRequests.length) {
        return toast.error("Vui lòng chọn ít nhất một đơn cứu trợ");
      }

      setLoading(true);
      await Promise.all(
        selectedRequests.map((requestId) =>
          TEAM_RESCUE_REQUEST_APIS.save({
            rescueTeamId: selectedTeamId,
            rescueRequestId: requestId,
          })
        )
      );

      toast.success("Phân công đội cứu trợ thành công");
      setIsAssignModalOpen(false);
      setSelectedRequests([]);
    } catch (error) {
      toast.error("Lỗi khi phân công đội cứu trợ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="manage">Quản lý đội cứu trợ</TabsTrigger>
          <TabsTrigger value="approval">Phê duyệt đội cứu trợ</TabsTrigger>
        </TabsList>
        <TabsContent value="manage" className="mt-4">
          <Card>
            <CardHeader className="flex">
              <CardTitle>Danh sách đội cứu trợ</CardTitle>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="ml-auto w-fit"
              >
                Tạo đội cứu trợ
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã đội</TableHead>
                    <TableHead>Tên đội</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Địa bàn hoạt động</TableHead>
                    <TableHead>Loại hình hoạt động</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescueTeams.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell className="font-medium">{team._id}</TableCell>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell>{team.phone}</TableCell>
                      <TableCell>{team.wardCode}</TableCell>
                      <TableCell>{team.operationType}</TableCell>
                      <TableCell>
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
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleAssignTeam(team._id)}
                            >
                              Phân công
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Create Team Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[725px] bg-white">
            <DialogHeader>
              <DialogTitle>Tạo đội cứu trợ mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin về đội cứu trợ mới
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamName" className="text-right">
                  Tên đội cứu trợ
                </Label>
                <Input
                  id="teamName"
                  value={newTeam.teamName}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, teamName: e.target.value })
                  }
                  placeholder="Nhập tên đội cứu trợ"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="operationType" className="text-right">
                  Loại hoạt động
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewTeam({ ...newTeam, operationType: value })
                  }
                  value={newTeam.operationType}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn loại hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rescue">Cứu hộ</SelectItem>
                    <SelectItem value="medical">Y tế</SelectItem>
                    <SelectItem value="transport">Vận chuyển</SelectItem>
                    <SelectItem value="supplies">Tiếp tế</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  value={newTeam.phone}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, phone: e.target.value })
                  }
                  placeholder="Nhập số điện thoại liên hệ"
                  className="col-span-3"
                />
              </div>

              {/* Phần thêm số điện thoại thành viên */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Số điện thoại thành viên</Label>
                <div className="col-span-3 space-y-2">
                  {newTeam.memberPhones.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={phone}
                        onChange={(e) => {
                          const updatedPhones = [...newTeam.memberPhones];
                          updatedPhones[index] = e.target.value;
                          setNewTeam({
                            ...newTeam,
                            memberPhones: updatedPhones,
                          });
                        }}
                        placeholder={`Nhập số điện thoại thành viên ${
                          index + 1
                        }`}
                      />
                      {index === newTeam.memberPhones.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setNewTeam({
                              ...newTeam,
                              memberPhones: [...newTeam.memberPhones, ""],
                            });
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                      {newTeam.memberPhones.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const updatedPhones = [...newTeam.memberPhones];
                            updatedPhones.splice(index, 1);
                            setNewTeam({
                              ...newTeam,
                              memberPhones: updatedPhones,
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supportCapability" className="text-right">
                  Khả năng hỗ trợ
                </Label>
                <Textarea
                  id="supportCapability"
                  value={newTeam.supportCapability}
                  onChange={(e) =>
                    setNewTeam({
                      ...newTeam,
                      supportCapability: e.target.value,
                    })
                  }
                  placeholder="Mô tả khả năng hỗ trợ của đội"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wardCode" className="text-right">
                  Địa bàn hoạt động
                </Label>
                <Input
                  id="wardCode"
                  value={newTeam.wardCode}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, wardCode: e.target.value })
                  }
                  placeholder="Nhập địa bàn hoạt động"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="button"
                onClick={handleCreateTeam}
                disabled={loading}
              >
                {loading ? "Đang tạo..." : "Tạo đội"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Assign Team Modal */}
        <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Phân công đội cứu trợ</DialogTitle>
              <DialogDescription>
                Chọn các đơn cứu trợ cần phân công
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4 max-h-[400px] overflow-y-auto">
              {rescueRequests.map((request) => (
                <div key={request._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={request._id}
                    checked={selectedRequests.includes(request._id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRequests([...selectedRequests, request._id]);
                      } else {
                        setSelectedRequests(
                          selectedRequests.filter((id) => id !== request._id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={request._id}>
                    {request.title} - {request.description}
                  </Label>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleSaveAssignments} disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu phân công"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TabsContent value="approval" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách đội cứu trợ chờ duyệt</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã đội</TableHead>
                    <TableHead>Tên đội</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Địa bàn hoạt động</TableHead>
                    <TableHead>Loại hình hoạt động</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescueTeams.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell className="font-medium">{team._id}</TableCell>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell>{team.phone}</TableCell>
                      <TableCell>{team.wardCode}</TableCell>
                      <TableCell>{team.operationType}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Chờ xác minh</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTeamToVerify(team._id);
                                setIsVerifyModalOpen(true);
                              }}
                            >
                              Duyệt đội
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Verify Team Modal */}
        <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Xác minh đội cứu trợ</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn duyệt đội cứu trợ này?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsVerifyModalOpen(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleVerifyTeam} disabled={loading}>
                {loading ? "Đang xử lý..." : "Xác minh"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
};

export default RescueTeamDashboard;
