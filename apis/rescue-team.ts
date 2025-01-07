import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "rescue-teams" + endpoint;

export const RESCUE_TEAMS_APIS = {
  // Các API hiện có
  getAll: (status?: string) => async () =>
    axiosInstance.get(baseURL(status ? `?status=${status}` : "/")),

  getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  addTeamMember: (rescueTeamId: string) => async (body: any) =>
    axiosInstance.post(baseURL("/" + rescueTeamId + "/members"), body),

  // Thêm các API mới
  getTeamDetailsByUserId: (userId: string) =>
    axiosInstance.get(baseURL(`/user/${userId}`)),

  inviteMember: (teamId: string, phone: string) =>
    axiosInstance.post(baseURL(`/${teamId}/members`), { phone }),

  leaveTeam: (teamId: string) =>
    axiosInstance.delete(baseURL(`/${teamId}/leave`)),

  removeMember: (teamId: string, memberId: string) =>
    axiosInstance.delete(baseURL(`/${teamId}/members/${memberId}`)),

  // Xử lý join requests
  handleJoinRequest: (
    userId: string,
    teamId: string,
    requestId: string,
    action: "accept" | "reject"
  ) =>
    axiosInstance.put(baseURL(`/${teamId}/join-requests/${requestId}`), {
      userId,
      status: action,
    }),

  // Cập nhật trạng thái team-rescue-request
  updateRequestStatus: (requestId: string, status: string) =>
    axiosInstance.put(baseURL(`/team-rescue-requests/${requestId}/status`), {
      status,
    }),

  update: async (rescueTeamId: string, body: string) =>
    axiosInstance.put(baseURL("/" + rescueTeamId), body),
};
