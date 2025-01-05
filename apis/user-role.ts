import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "user-roles" + endpoint;

export const USER_ROLES_APIS = {
  getAll: async (userId: string) =>
    axiosInstance.get(baseURL("/" + userId + "/roles")),
  // getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  save: async (userId: string, body: any) =>
    axiosInstance.post(baseURL("/" + userId + "/roles"), body),
};
