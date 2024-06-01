import useSWR from "swr";
import { fetcher } from "@/help/fetcher";

export function useGenres() {
  return useSWR(`http://localhost:8000/genres`, fetcher, {
    refreshInterval: 0,
  });
}
