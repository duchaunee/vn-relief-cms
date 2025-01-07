import axiosInstance from "@/lib/axios";
import _ from "lodash";

const baseURL = (endpoint: string) => "vehicles" + endpoint;

export const VEHICLE_APIS = {
  getAllByType: (type: "all" | string) => async () =>
    axiosInstance.get(baseURL(`?type=${type}`)),

  getById: (id: string) => async () => axiosInstance.get(baseURL("/" + id)),

  getVehicleByUserId: async (userId: string) =>
    axiosInstance.get(baseURL("/user/" + userId)),

  getVehicleBorrowsController: (vehicleId: string) => async () =>
    axiosInstance.get(baseURL("/" + vehicleId + "/borrows")),

  save: async (body: any) => axiosInstance.post(baseURL("/"), body),

  update: async (vehicleId: string, body: any) =>
    axiosInstance.put(baseURL("/" + vehicleId), body),
  delete: async (vehicleId: string) =>
    axiosInstance.delete(baseURL("/" + vehicleId)),
};
