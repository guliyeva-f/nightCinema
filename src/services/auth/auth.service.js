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
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async register(payload) {
    try {
      const response = await $axios.post($api(API.register), payload);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  static async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Refresh token not found");

      const response = await $axios.post($api(API["refresh-token"]), {
        refreshToken,
      });

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        return response.data.data.accessToken;
      } else {
        throw new Error("Token could not be refreshed");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  }
}