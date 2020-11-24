import axios from "axios";
import { appConfig } from "../BaseModules/Config/ApplicationConfig/appConfig";
import baseAxios from "../DataAdapters/Axios/authAxios";
import securityUtill from "./securityUtill";

// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// // axios.defaults.headers["authorization"] =
// //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYW5qaXRoIiwiZXhwIjoxNjAyODYzNTg3LCJpYXQiOjE2MDI3NzcxODd9.pOqiFGONVF7yxL6dato9-i74mbhFhstf0ehciQXiPHE";

class SecurityBo {
  authorizationAxios = axios.create({
    baseURL: appConfig.authorizationUtrl,
  });

  authorizeUser = async (userData) => {
    try {
      const response = await this.authorizationAxios({
        method: "post",
        url: "/authorization/authorize",
        data: { ...userData },
        headers: {
          "content-Type": "application/json",
          accept: "application/json,text/plain,*/*",
          "accept-language": "en-US,en;q=0.9",
        },
      });
      securityUtill.setJwtToken(response.data.jwtToken);
      return true;
    } catch {
      return false;
    }
    // const response = await fetch(
    //   "http://localhost:9133/authorization/authorize",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //   }
    // );
  };

  signUp = async (userData) => {
    try {
      await this.authorizationAxios({
        method: "post",
        url: "/user",
        data: { ...userData },
        headers: {
          "content-Type": "application/json",
          accept: "application/json,text/plain,*/*",
          "accept-language": "en-US,en;q=0.9",
        },
      });
      return true;
    } catch {
      return false;
    }
    // const response = await fetch(
    //   "http://localhost:9133/authorization/authorize",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //   }
    // );
  };

  getUserInfo = async (username) => {
    try {
      let userInfo = await baseAxios({
        method: "get",
        url: `${appConfig.authorizationUtrl}/user/${username}`,
      });
      return userInfo.data;
    } catch {
      return false;
    }
  };

  updateUserInfo = (userData) => {
    baseAxios({
      method: "put",
      url: `${appConfig.authorizationUtrl}/user`,
      data: { ...userData },
    });
  };
}

const securityBo = new SecurityBo();
export default securityBo;
