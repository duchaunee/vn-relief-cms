import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "transport-supplies" + endpoint;

export const TRANSPORT_SUPPLIES_APIS = {
  // getAll: (status: string) => async () =>
  //   axiosInstance.get(baseURL(`/?status=${status}`)),

  checkExistVehicleReceivedRescueRequest: async (body: any) =>
    axiosInstance.post(baseURL("/check-vehicle-exist/"), body),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
