import { instance } from "./instance";

export const FilmApi = {
  addFilm: async (payload: any) => {
    // console.log(payload);
    try{

    const response = await instance.post("/movies", payload);
    return response.data;
    }catch(error: Error | any){
      throw new Error(error.response.data.message || 'Đã xảy ra lỗi.');
    }
  },
  updateFilm: async (payload: any,id:any) => {
    try{

    const response = await instance.put(`/movies/${id}`, payload);
    return response.data;
    }catch(error: Error | any){
      throw new Error(error.response.data.message || 'Đã xảy ra lỗi.');
    }
  },
  deleteFilm: async (id: any) => {
    try{
        const response = await instance.delete(`/movies/${id}`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message || 'Đã xảy ra lỗi.');
    }
  }
};
