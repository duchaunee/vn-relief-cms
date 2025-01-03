import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "roles" + endpoint;

export const ROLES_APIS = {
  getAll: async () => axiosInstance.get(baseURL("/")),
  // getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  // save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
