import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "users" + endpoint;

export const USER_APIS = {
  getAll: (status?: string) => async () =>
    axiosInstance.get(baseURL(status ? `?status=${status}` : "")),

  getByRole: (role: (0 | 1 | 2 | 3 | 4 | 5)[]) => async () =>
    axiosInstance.get(baseURL(`/roles?roles=${role}`)),

  getByPhoneNumber: async (phone: string) =>
    axiosInstance.get(baseURL("/phone/" + phone)),

  getByUidFirebase: async (uid: string) =>
    axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (body: any) => axiosInstance.post(baseURL("/"), body),

  update: async (userId: string, body: any) =>
    axiosInstance.put(baseURL("/" + userId), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
