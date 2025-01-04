import axiosInstance from "@/lib/axios";
import { RequestData } from "@/types/models/rescue-request";
import { RescueRequestItem } from "@/types/models/rescue-request-item";
import _ from "lodash";

const baseURL = (endpoint: string) =>
  "rescue-request-items/rescue-requests" + endpoint;

export const RESCUE_REQUEST_ITEMS_APIS = {
  getAllByRescueRequestId: (rescueRequestId: string) => async () =>
    axiosInstance.get(baseURL("/" + rescueRequestId + "/items")),
  // getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),
  save: async (rescueRequestId: string, body: any[]) =>
    axiosInstance.post(baseURL("/" + rescueRequestId + "/items"), body),
};
