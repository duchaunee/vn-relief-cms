import axios from "axios";
import Cookies from "js-cookie";

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
  (config) => {
    // Lấy token từ cookie
    const token = Cookies.get("token");

    // Nếu có token, thêm vào header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response data nếu cần
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;

          // Lưu token mới
          Cookies.set("token", token);

          // Cập nhật token trong header
          originalRequest.headers.Authorization = `Bearer ${token}`;

          // Thử lại request ban đầu
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh token failed, logout
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

// Hàm xử lý login thành công
export const handleLoginSuccess = (token: string, refreshToken: string) => {
  // Lưu token vào cookie
  Cookies.set("token", token);
  Cookies.set("refreshToken", refreshToken);

  // Cập nhật default headers
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Hàm xử lý logout
export const handleLogout = () => {
  // Xóa token khỏi cookie
  Cookies.remove("token");
  Cookies.remove("refreshToken");

  // Xóa Authorization header
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Hàm kiểm tra trạng thái đăng nhập
export const isAuthenticated = () => {
  return !!Cookies.get("token");
};

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
