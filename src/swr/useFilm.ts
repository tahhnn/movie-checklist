import useSWR from "swr";
import { fetcher } from "@/help/fetcher";
export function useFilm() {
  return useSWR(`http://localhost:8000/movies`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
}
export function getFilmTopRate() {
  return useSWR(`http://localhost:8000/movies`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
}
export function getOneFilm(id: any) {
  return useSWR(`http://localhost:8000/movies/${id}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
}
export function getFilmBySearch(searchText: string) {
  return useSWR(`http://localhost:8000/movies?q=${searchText}`, fetcher, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
}
