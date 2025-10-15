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
        alert("Uğurla daxil oldun!");
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        this.userData = response.data.data;
      } 
      else {
        alert(response.data.errorMessage || "Login uğursuz oldu!");
      }
      return response.data;
    } 
    catch (error) {
      console.error("Login error:", error);
      alert("Serverlə əlaqə qurulmadı.");
      throw error;
    }
  }
}