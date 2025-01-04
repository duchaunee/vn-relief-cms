import axiosInstance from "@/lib/axios";
import _ from "lodash";

//bên apis viết luôn trong controller của rescue-team,nhưng ở file này cứ tách ra cho dễ hình dung
const baseURL = (endpoint: string) => "/support-locations" + endpoint;

export const SUPPORT_LOCATION_APIS = {
  getAllByUserId: (rescueRequestId: any) => async () =>
    axiosInstance.get(baseURL("/" + rescueRequestId + "/rescue-teams")),

  //lấy ra tất cả địa điểm WAREHOUSE support locaiton mà vehicle đã đến lấy hàng
  getAllByVehicleId: async (vehicleId: string) =>
    axiosInstance.get(baseURL("/vehicle-received/" + vehicleId)),

  getAllByType: (type: string, from: "all" | string) => async () =>
    axiosInstance.get(baseURL("/user/" + from + `?type=${type}`)),
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
