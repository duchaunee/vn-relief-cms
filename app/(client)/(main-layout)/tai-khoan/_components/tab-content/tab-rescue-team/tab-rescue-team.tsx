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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, LogOut } from "lucide-react";
import toast from "react-hot-toast";

// Mock Data
const initialMembers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0123456789", role: "Member" },
  { id: 2, name: "Trần Thị B", phone: "0987654321", role: "Member" },
  { id: 3, name: "Lê Văn C", phone: "0369852147", role: "Member" },
];

const initialRequests = [
  { id: 1, name: "Phạm Văn D", phone: "0123456780", status: "pending" },
  { id: 2, name: "Hoàng Thị E", phone: "0987654322", status: "pending" },
];

const initialRescueRequests = [
  {
    id: 1,
    title: "Hỗ trợ di dời dân",
    location: "Xã ABC, Huyện XYZ",
    priority: "high",
    status: "pending",
    description: "Hỗ trợ di dời 50 hộ dân trong vùng ngập lụt",
  },
  {
    id: 2,
    title: "Phân phát nhu yếu phẩm",
    location: "Phường DEF, Quận UVW",
    priority: "medium",
    status: "in_progress",
    description: "Phân phát lương thực, nước uống cho 100 hộ dân",
  },
  {
    id: 3,
    title: "Sơ tán khẩn cấp",
    location: "Thôn GHI, Xã JKL",
    priority: "high",
    status: "completed",
    description: "Sơ tán người dân khỏi vùng sạt lở",
  },
];

const RescueTeamDashboard = () => {
  const [teamMembers, setTeamMembers] = useState(initialMembers);
  const [joinRequests, setJoinRequests] = useState(initialRequests);
  const [rescueRequests, setRescueRequests] = useState(initialRescueRequests);
  const [invitePhone, setInvitePhone] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const handleInviteMember = () => {
    if (teamMembers.some((member) => member.phone === invitePhone)) {
      toast.error("Số điện thoại này đã là thành viên của đội!");
      return;
    }

    const newMember = {
      id: teamMembers.length + 1,
      name: `Thành viên ${invitePhone}`,
      phone: invitePhone,
      role: "Member",
    };

    setTeamMembers([...teamMembers, newMember]);
    setInvitePhone("");
    setIsInviteOpen(false);
    toast.success("Đã mời thành viên thành công!");
  };

  const handleLeaveTeam = () => {
    setIsLeaveOpen(false);
    toast.success("Đã rời khỏi đội thành công!");
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
    setIsConfirmRemoveOpen(false);
    setMemberToRemove(null);
    toast.success("Đã xóa thành viên khỏi đội!");
  };

  const handleJoinRequest = (requestId, action) => {
    if (action === "accept") {
      const request = joinRequests.find((req) => req.id === requestId);
      const newMember = {
        id: teamMembers.length + 1,
        name: request.name,
        phone: request.phone,
        role: "Member",
      };
      setTeamMembers([...teamMembers, newMember]);
      toast.success("Đã chấp nhận yêu cầu tham gia!");
    } else {
      toast.success("Đã từ chối yêu cầu tham gia!");
    }

    setJoinRequests(joinRequests.filter((req) => req.id !== requestId));
  };

  const handleUpdateRescueStatus = (requestId, newStatus) => {
    setRescueRequests((requests) =>
      requests.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    toast.success("Đã cập nhật trạng thái đơn cứu trợ!");
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge variant="default">Trung bình</Badge>;
      default:
        return <Badge variant="secondary">Thấp</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Chờ xử lý</Badge>;
      case "in_progress":
        return <Badge variant="default">Đang thực hiện</Badge>;
      case "completed":
        return <Badge variant="success">Hoàn thành</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="team">Quản lý đội</TabsTrigger>
          <TabsTrigger value="requests">Yêu cầu tham gia</TabsTrigger>
          <TabsTrigger value="rescue">Đơn cứu trợ</TabsTrigger>
        </TabsList>

        {/* Team Management Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Thành viên đội</span>
                <div className="flex gap-2">
                  {/* Invite Member Dialog */}
                  <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Mời thành viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mời thành viên mới</DialogTitle>
                        <DialogDescription>
                          Nhập số điện thoại của thành viên bạn muốn mời
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        placeholder="Số điện thoại"
                        value={invitePhone}
                        onChange={(e) => setInvitePhone(e.target.value)}
                      />
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsInviteOpen(false)}
                        >
                          Hủy
                        </Button>
                        <Button onClick={handleInviteMember}>
                          Mời thành viên
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Leave Team Dialog */}
                  <Dialog open={isLeaveOpen} onOpenChange={setIsLeaveOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <LogOut className="w-4 h-4 mr-2" />
                        Rời đội
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xác nhận rời đội</DialogTitle>
                        <DialogDescription>
                          Bạn có chắc chắn muốn rời khỏi đội cứu trợ này?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsLeaveOpen(false)}
                        >
                          Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleLeaveTeam}>
                          Xác nhận rời đội
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Dialog
                          open={
                            isConfirmRemoveOpen && memberToRemove === member.id
                          }
                          onOpenChange={(open) => {
                            setIsConfirmRemoveOpen(open);
                            if (!open) setMemberToRemove(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setMemberToRemove(member.id)}
                            >
                              Xóa
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Xác nhận xóa thành viên</DialogTitle>
                              <DialogDescription>
                                Bạn có chắc chắn muốn xóa thành viên này khỏi
                                đội?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsConfirmRemoveOpen(false);
                                  setMemberToRemove(null);
                                }}
                              >
                                Hủy
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                Xác nhận xóa
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Join Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Yêu cầu tham gia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {joinRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.phone}</TableCell>
                      <TableCell>
                        <Badge>Chờ duyệt</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              handleJoinRequest(request.id, "accept")
                            }
                          >
                            Chấp nhận
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleJoinRequest(request.id, "reject")
                            }
                          >
                            Từ chối
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rescue Requests Tab */}
        <TabsContent value="rescue">
          <Card>
            <CardHeader>
              <CardTitle>Đơn cứu trợ</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Địa điểm</TableHead>
                    {/* <TableHead>Độ ưu tiên</TableHead> */}
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescueRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-gray-500">
                            {request.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.location}</TableCell>
                      {/* <TableCell>
                        {getPriorityBadge(request.priority)}
                      </TableCell> */}
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Select
                          value={request.status}
                          onValueChange={(value) =>
                            handleUpdateRescueStatus(request.id, value)
                          }
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Cập nhật trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                            <SelectItem value="in_progress">
                              Đang thực hiện
                            </SelectItem>
                            <SelectItem value="completed">
                              Hoàn thành
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rescueRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Chưa có đơn cứu trợ nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RescueTeamDashboard;
