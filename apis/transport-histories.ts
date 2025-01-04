import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "transport-histories/vehicles" + endpoint;

export const TRANSPORT_HISTORIES_APIS = {
  // getAll: (status: string) => async () =>
  //   axiosInstance.get(baseURL(`/?status=${status}`)),

  // getByPhoneNumber: async (phone: string) =>
  //   axiosInstance.get(baseURL("/phone/" + phone)),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (vehicleId: string, body: any) =>
    axiosInstance.post(baseURL("/" + vehicleId), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
