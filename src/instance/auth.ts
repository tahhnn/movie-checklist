import instance from "./instance";

const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};
export const AuthApi = {
  login: async (payload: any) => {
    try {
      const response = await instance.post("/signin", payload);

      if (response.status === 200) {
        const token = response.data.accessToken;
        setAuthToken(token);
        localStorage.setItem("token", token);
        return token;
      }
    } catch (error) {
      throw new Error(
        error.response.data.message || "Đã xảy ra lỗi khi đăng nhập."
      );
    }
  },
  register: async (payload: any) => {
    try {
      const response = await instance.post("/register", payload);

      return response.data;
    } catch (error: Error | any) {
      throw new Error(
        error.response.data.message || "Đã xảy ra lỗi khi đăng ký."
      );
    }
  },
};
