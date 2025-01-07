import axiosInstance from "@/lib/axios";
import { RequestData } from "@/types/models/rescue-request";

const baseURL = (endpoint: string) => "rescue-requests" + endpoint;

export const RESCUE_REQUEST_APIS = {
  getAll: (type?: string) => async () =>
    axiosInstance.get(baseURL(type ? `?type=${type}` : "/")),

  getAllByUserId: (userId: string) => async () =>
    axiosInstance.get(baseURL(`/user?id=${userId}`)),

  getReceivedRequestsController: (rescueRequestId: any) => async () =>
    axiosInstance.get(baseURL("/received-request/" + rescueRequestId)),

  getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  save: async (body: RequestData) => axiosInstance.post(baseURL("/"), body),
};
