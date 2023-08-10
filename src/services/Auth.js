import { request, updateRequest } from ".";

class Auth {
  login = async (credencitais) => {
    try {
      const payload = await request.post("/auth/login/", credencitais);
      this.setCredentials(payload);
      updateRequest();
      return payload;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  refresh = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    if (refresh_token === null) {
      return false;
    }

    const formData = new FormData();
    formData.append("refresh_token", refresh_token);

    try {
      const payload = await request.post("/auth/refresh/", formData);
      this.setCredentials(payload);
      return true;
    } catch (error) {
      this.clearLocalStorage();
      return false;
    }
  };

  logout = ({setUserAuth}) => {
    this.clearLocalStorage();
    setUserAuth(null);
  };

  clearLocalStorage = () => {
    localStorage.removeItem("token_type");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    updateRequest();
  };

  setCredentials = (payload) => {
    localStorage.setItem("access_token", payload.access_token);
    localStorage.setItem("refresh_token", payload.refresh_token);
    localStorage.setItem("token_type", payload.token_type);
  };
}

export default new Auth();
