import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "users" + endpoint;

export const USER_ROLES_APIS = {
  getAll: (status: string) => async () =>
    axiosInstance.get(baseURL(`/?status=${status}`)),
  // getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
