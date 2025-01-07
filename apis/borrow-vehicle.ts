import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "borrow-vehicles" + endpoint;

export const BORROW_VEHICLE_APIS = {
  getAllByUserId: (userId: string) => async () =>
    axiosInstance.get(baseURL(`?userId=${userId}`)),

  // getAllByVehicleId: (vehicleId: string) => async () =>
  //   axiosInstance.get(baseURL(`?userId=${vehicleId}`)),

  // getByPhoneNumber: async (phone: string) =>
  //   axiosInstance.get(baseURL("/phone/" + phone)),

  // getByUidFirebase: async (uid: string) =>
  //   axiosInstance.get(baseURL("/firebase/" + uid)),

  save: async (body: any) => axiosInstance.post(baseURL("/borrow"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
