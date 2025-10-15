import { $axios } from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";
import toast from "react-hot-toast";

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
      const loginPromise = $axios.post($api(API.login), payload);

      toast.promise(loginPromise, {
        loading: "Daxil olunur..."
      });

      const response = await loginPromise;

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        this.userData = response.data.data;
      } 

      else {
        toast.error(response.data.errorMessage || "Login uğursuz oldu!");
      }

      return response.data;
    } 
    catch (error) {
      console.error("Login error:", error);
      toast.error("Serverlə əlaqə qurulmadı.");
      throw error;
    }
  }

  static async register(payload) {
    try {
       const registerPromise = $axios.post($api(API.register), payload);

      toast.promise(registerPromise, {
        loading: "Qeydiyyat aparılır...",
      });

      const response = await registerPromise;

      if (response.data.success) {
        toast.success("Qeydiyyat keçdin, indi isə daxil ol");
      } 
      else {
        toast.error(response.data.errorMessage || "Qeydiyyat uğursuz oldu!");
      }

      return response.data;
    }
    
    catch (error) {
      console.error("Register error:", error);
      alert("Serverlə əlaqə qurulmadı.");
      throw error;
    }
  }
}