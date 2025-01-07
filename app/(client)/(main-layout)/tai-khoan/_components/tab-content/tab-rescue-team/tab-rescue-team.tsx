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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { RESCUE_TEAMS_APIS } from "@/apis/rescue-team";
import { getCurrentUser } from "@/lib/axios";

const RescueTeamDashboard = () => {
  const user = getCurrentUser();
  const queryClient = useQueryClient();
  const [invitePhone, setInvitePhone] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  // Fetch team data
  const { data: teamData, isLoading } = useQuery({
    queryKey: ["team-details", user?._id],
    queryFn: () => RESCUE_TEAMS_APIS.getTeamDetailsByUserId(user?._id),
    enabled: !!user?._id,
  });

  const inviteMutation = useMutation({
    mutationFn: (phone) =>
      RESCUE_TEAMS_APIS.inviteMember(teamData?.data?.team?._id, phone),
    onSuccess: () => {
      queryClient.invalidateQueries(["team-details"]);
      setInvitePhone("");
      setIsInviteOpen(false);
      toast.success("Đã mời thành viên thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi mời thành viên!");
    },
  });

  const leaveTeamMutation = useMutation({
    mutationFn: () => RESCUE_TEAMS_APIS.leaveTeam(teamData?.data?.team?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["team-details"]);
      setIsLeaveOpen(false);
      toast.success("Đã rời khỏi đội thành công!");
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (memberId) =>
      RESCUE_TEAMS_APIS.removeMember(teamData?.data?.team?._id, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries(["team-details"]);
      setIsConfirmRemoveOpen(false);
      setMemberToRemove(null);
      toast.success("Đã xóa thành viên khỏi đội!");
    },
  });

  const handleJoinRequestMutation = useMutation({
    mutationFn: ({ userIdRequest, requestId, action }) =>
      RESCUE_TEAMS_APIS.handleJoinRequest(
        userIdRequest,
        teamData?.data?.team?._id,
        requestId,
        action
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["team-details"]);
      toast.success(
        currentAction === "accept"
          ? "Đã chấp nhận yêu cầu tham gia!"
          : "Đã từ chối yêu cầu tham gia!"
      );
    },
  });

  const updateRequestStatusMutation = useMutation({
    mutationFn: ({ requestId, status }) =>
      RESCUE_TEAMS_APIS.updateRequestStatus(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["team-details"]);
      toast.success("Đã cập nhật trạng thái đơn cứu trợ!");
    },
  });

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

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="w-full h-[200px]" />
      </div>
    );
  }

  const { team, members, pendingJoinRequests, assignedRequests } =
    teamData?.data || {};

  console.log(
    "\n🔥 ~ file: tab-rescue-team.tsx:138 ~ pendingJoinRequests::\n",
    pendingJoinRequests
  );
  return (
    <div className="w-full p-4">
      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="team">Quản lý đội</TabsTrigger>
          <TabsTrigger value="requests">
            Yêu cầu tham gia ({pendingJoinRequests?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="rescue">
            Đơn cứu trợ ({assignedRequests?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Team Management Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{team?.teamName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {team?.operationType}
                  </p>
                </div>
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
                        <Button
                          onClick={() => inviteMutation.mutate(invitePhone)}
                          disabled={inviteMutation.isPending}
                        >
                          {inviteMutation.isPending
                            ? "Đang xử lý..."
                            : "Mời thành viên"}
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
                        <Button
                          variant="destructive"
                          onClick={() => leaveTeamMutation.mutate()}
                          disabled={leaveTeamMutation.isPending}
                        >
                          {leaveTeamMutation.isPending
                            ? "Đang xử lý..."
                            : "Xác nhận rời đội"}
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
                  {members?.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Dialog
                          open={
                            isConfirmRemoveOpen && memberToRemove === member._id
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
                              onClick={() => setMemberToRemove(member._id)}
                              disabled={member._id === user?._id}
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
                                onClick={() =>
                                  removeMemberMutation.mutate(member._id)
                                }
                                disabled={removeMemberMutation.isPending}
                              >
                                {removeMemberMutation.isPending
                                  ? "Đang xử lý..."
                                  : "Xác nhận xóa"}
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
                  {pendingJoinRequests?.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>{request.user.name}</TableCell>
                      <TableCell>{request.user.phone}</TableCell>
                      <TableCell>
                        <Badge>Chờ duyệt</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              handleJoinRequestMutation.mutate({
                                userIdRequest: request.user._id,
                                requestId: request._id,
                                action: "accept",
                              })
                            }
                            disabled={handleJoinRequestMutation.isPending}
                          >
                            Chấp nhận
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleJoinRequestMutation.mutate({
                                requestId: request._id,
                                action: "reject",
                              })
                            }
                            disabled={handleJoinRequestMutation.isPending}
                          >
                            Từ chối
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingJoinRequests?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Không có yêu cầu tham gia nào
                      </TableCell>
                    </TableRow>
                  )}
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
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedRequests?.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {request.rescueRequest.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.rescueRequest.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{request.rescueRequest.address}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Select
                          value={request.status}
                          onValueChange={(value) =>
                            updateRequestStatusMutation.mutate({
                              requestId: request._id,
                              status: value,
                            })
                          }
                          disabled={updateRequestStatusMutation.isPending}
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
                  {assignedRequests?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
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
