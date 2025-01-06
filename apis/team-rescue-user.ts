import axiosInstance from "@/lib/axios";
import _ from "lodash";

//bên apis viết luôn trong controller của rescue-team,nhưng ở file này cứ tách ra cho dễ hình dung
const baseURL = (endpoint: string) => "/rescue-teams" + endpoint;

export const TEAM_RESCUE_USER_APIS = {
  // getAll: (status: string) => async () =>
  //   axiosInstance.get(baseURL(`/?status=${status}`)),

  // getByPhoneNumber: async (phone: string) =>
  //   axiosInstance.get(baseURL("/phone/" + phone)),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (rescueTeamId: any, body: any) =>
    axiosInstance.post(baseURL("/" + rescueTeamId + "/join-requests"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
