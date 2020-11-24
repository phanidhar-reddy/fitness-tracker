import axios from "axios";
import securityUtill from "../../Bo/securityUtill";

const baseAxios = axios.create();

baseAxios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  req.headers.Authorization = securityUtill.getTokenForHeader();
  return req;
});

baseAxios.interceptors.response.use((res) => {
  if (res.headers.authorization)
    securityUtill.setJwtToken(res.headers.authorization);
  // Important: response interceptors **must** return the response.
  return res;
});

export default baseAxios;
