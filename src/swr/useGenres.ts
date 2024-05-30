import useSWR from "swr";
import { fetcher } from "@/help/fetcher";

export function useGenres() {
  return useSWR(`http://localhost:3000/genres`, fetcher, {
    refreshInterval: 0,
  });
}
