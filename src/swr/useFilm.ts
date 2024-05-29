import useSWR from "swr";
import { fetcher } from "@/help/fetcher";
export function useFilm() {
  return useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher,
  
  );
}
export function getFilmTopRate() {
  return useSWR(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher,
  
  );
}
