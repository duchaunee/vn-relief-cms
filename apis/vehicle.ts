import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "vehicles" + endpoint;

export const VEHICLE_APIS = {
  getAllByType: (type: "all" | string) => async () =>
    axiosInstance.get(baseURL(`?type=${type}`)),

  getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),

  getVehicleBorrowsController: (vehicleId: string) => async () =>
    axiosInstance.get(baseURL("/" + vehicleId + "/borrows")),

  save: async (body: any) => axiosInstance.post(baseURL("/"), body),
  // addTeamMember: (rescueTeamId: any) => async (body: any) =>
  //   axiosInstance.post(baseURL("/" + rescueTeamId + "members"), body),
};
