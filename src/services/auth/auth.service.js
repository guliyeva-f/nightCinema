import { $axios } from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";

export class AuthService {
  static userData = {};

  static getUserData() {
    return this.userData;
  }

  static isLoggedIn() {
    return !!localStorage.getItem("accessToken");
  }

  static async login(payload) {
    try {
      const response = await $axios.post($api(API.login), payload);

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        this.userData = response.data.data;
      }
      return response.data;
    }
    catch (err) {
      throw new Error('Login request failed: ' + err.message);
    }
  }

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.userData = {};
    window.location.href = "/auth/login";
  }

  static async register(payload) {
    try {
      const response = await $axios.post($api(API.register), payload);
      return response.data;
    }
    catch (err) {
      throw new Error('Register request failed: ' + err.message);
    }
  }

  static async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Refresh token not found");

      const url = import.meta.env.DEV
        ? "http://localhost:5000/api/auth/refresh_token"
        : import.meta.env.VITE_APP_URL + "/api/auth/refresh_token";

      const response = await $axios.post(
        url,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to refresh token");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data.data;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      console.log("Tokens refreshed successfully");
      return newAccessToken;
    }
    catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  }
}