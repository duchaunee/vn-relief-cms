import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "users" + endpoint;

export const USER_APIS = {
  getAll: (status: string) => async () =>
    axiosInstance.get(baseURL(`/?status=${status}`)),

  getByRole: (role: string) => async () =>
    axiosInstance.get(baseURL(`/?role=${role}`)),

  getByPhoneNumber: async (phone: string) =>
    axiosInstance.get(baseURL("/phone/" + phone)),

  getByUidFirebase: async (uid: string) =>
    axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
