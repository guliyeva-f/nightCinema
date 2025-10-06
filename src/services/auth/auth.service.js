import { $axios } from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";

export class AuthService {
  constructor() {
    this.userData = {};
  }
  static getUserData() {
    return this.userData;
  }

  static login(payload) {
    return $axios.post($api(API.login),payload).then(data=> data)
  }
}
