import useSWR from "swr";
import { fetcher } from "@/help/fetcher";
export function useFilm() {
  return useSWR(`http://localhost:3000/movies`, fetcher);
}
export function getFilmTopRate() {
  return useSWR(`http://localhost:3000/movies`, fetcher);
}
export function getOneFilm(id:any) {
  return useSWR(`http://localhost:3000/movies/${id}`, fetcher);
}
