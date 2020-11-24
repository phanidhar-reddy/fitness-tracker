class SecurityUtill {
  setJwtToken = (jwtToken) => {
    sessionStorage.setItem("jwtToken", jwtToken);
  };

  removeJwtToken = () => {
    sessionStorage.removeItem("jwtToken");
  };
  getJwtToken = () => {
    return sessionStorage.getItem("jwtToken");
  };

  getTokenForHeader = () => {
    return sessionStorage.getItem("jwtToken")
      ? `Bearer ${sessionStorage.getItem("jwtToken")}`
      : "";
  };
}

const securityUtill = new SecurityUtill();
export default securityUtill;
