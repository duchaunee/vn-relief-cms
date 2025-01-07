import axiosInstance from "@/lib/axios";
import _ from "lodash";

//bên apis viết luôn trong controller của rescue-team,nhưng ở file này cứ tách ra cho dễ hình dung
const baseURL = (endpoint: string) => "/team-rescue-requests" + endpoint;

export const TEAM_RESCUE_REQUEST_APIS = {
  getAllByRescueRequestId: (rescueRequestId: any) => async () =>
    axiosInstance.get(baseURL("/" + rescueRequestId + "/rescue-teams")),

  receivedSaveRescueReqeust: async (
    rescueTeamId: string,
    rescueRequestId: string
  ) =>
    axiosInstance.post(
      baseURL(
        "/rescue-teams/" + rescueTeamId + "/rescue-requests/" + rescueRequestId
      ),
      {
        action: "accept",
      }
    ),

  // getByPhoneNumber: async (phone: string) =>
  //   axiosInstance.get(baseURL("/phone/" + phone)),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (rescueRequestId: any, body: any) =>
    axiosInstance.post(
      baseURL("/" + rescueRequestId + "/rescue-requests"),
      body
    ),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
