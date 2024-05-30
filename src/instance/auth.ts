import { instance } from "./instance";

export const AuthApi = {
  login: async (payload : any) => {
    try {
      console.log(payload);
      const response = await instance.post("/signin", payload);
      
      
      return response.data;
    } catch (error: Error | any) {
      throw new Error(error.response.data.message || 'Đã xảy ra lỗi khi đăng nhập.');
    }
  },
  register: async (payload:any) => {
    try {
    
      const response = await instance.post("/register", payload);
      
      return response.data;
    } catch (error: Error | any) {
      throw new Error(error.response.data.message || 'Đã xảy ra lỗi khi đăng ký.');
    }
  },
};