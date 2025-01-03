import { auth } from "@/configs/firebase";
import { getNaturalDisasterToLocal } from "@/utils/auth";
import axios from "axios";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import _ from "lodash";
import toast from "react-hot-toast";

// Tạo instance axios với config mặc định
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const naturalDisaster = getNaturalDisasterToLocal();
// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    // if (accessToken) {
    //   // request.headers.authorization = getAccessTokenToSession();
    //   request.headers.authorization = `Bearer ${accessToken}`;
    // }
    if (naturalDisaster) {
      request.headers.naturalDisaster = naturalDisaster;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // const { url } = response.config;
    // if (url === "/auth/login") {
    //   accessToken = response.data.accessToken;
    //   saveAccessTokenToSession(accessToken);
    // } else if (url === "/auth/logout") {
    //   accessToken = "";
    //   clearAccessTokenToSession();
    // }
    return response.data;
  },
  (error) => {
    // console.log("Error trong axios: ", error);
    return Promise.reject(error.response.data);
  }
);

// Hàm xử lý login thành công
export const handleLoginSuccess = (token: string, refreshToken: string) => {
  // Lưu token vào cookie
  // Cookies.set("token", token);
  // Cookies.set("refreshToken", refreshToken);

  // Cập nhật default headers
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Hàm xử lý logout
export const handleLogout = async () => {
  try {
    await signOut(auth);
    window.dispatchEvent(new CustomEvent("saveDataState"));
    window.location.reload(); //reload để chạy lại middware --> redicrect
    toast.success("Đăng xuất thành công");
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
};

// Hàm kiểm tra trạng thái đăng nhập
export const isAuthenticatedByRole = (
  role: "admin" | "rescue-team" | "user" | "volunteer"
) => {
  const user = getCurrentUser();
  if (!user) return false;

  const listRoleCode = user?.roles?.map((role: any) => role.roleId.code); //list code

  switch (role) {
    case "admin":
      return listRoleCode.includes(0);
    case "rescue-team":
      return listRoleCode.includes(1);
    case "user":
      return listRoleCode.includes(5);
    case "volunteer":
      return _.intersection(listRoleCode, [2, 3, 4]).length > 0;
    default:
      return false;
  }
};

export const isLogged = () => !!Cookies.get("user");

export const getCurrentUser = () =>
  isLogged() ? JSON.parse(Cookies.get("user")) : null;

// ==========================
// Export instance để sử dụng trong app
export default axiosInstance;

// Ví dụ sử dụng:
/*
import api from '@/lib/axios';

// Login
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, refreshToken } = response.data;
    handleLoginSuccess(token, refreshToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API calls
const getData = async () => {
  try {
    const response = await api.get('/api/data');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await api.post('/auth/logout');
    handleLogout();
  } catch (error) {
    // Still remove tokens even if API call fails
    handleLogout();
    throw error;
  }
};
*/
