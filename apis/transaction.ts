import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "/transactions" + endpoint;

export const TRANSACTIONS_APIS = {
  save: async (rescueRequestId: any, body: any) =>
    axiosInstance.post(baseURL("/" + rescueRequestId + "/goods"), body),
};
