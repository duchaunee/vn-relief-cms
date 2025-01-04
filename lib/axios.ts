import { auth } from "@/configs/firebase";
import { getNaturalDisasterFromCookies } from "@/utils/auth";
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

// Request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    const naturalDisaster: any = getNaturalDisasterFromCookies();
    console.log(
      "\n🔥 ~ file: axios.ts:19 ~ naturalDisaster::\n",
      naturalDisaster
    );

    if (naturalDisaster) {
      request.headers.naturaldisasterid = naturalDisaster._id;
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
    // return Promise.reject(error.response.data);
  }
);

// Hàm xử lý login thành công
// export const handleLoginSuccess = (token: string, refreshToken: string) => {
//   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// Hàm xử lý logout
export const handleLogout = async () => {
  try {
    await signOut(auth);
    window.dispatchEvent(new CustomEvent("saveDataState"));
    window.location.replace("/dang-nhap"); //reload để chạy lại middware --> redicrect
    // toast.success("Đăng xuất thành công");
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
