import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "natural-disasters" + endpoint;

export const NATURAL_DISASTER_APIS = {
  getActive: async () => axiosInstance.get(baseURL(`/active`)),

  // getByPhoneNumber: async (phone: string) =>
  //   axiosInstance.get(baseURL("/phone/" + phone)),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  // save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  // //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
