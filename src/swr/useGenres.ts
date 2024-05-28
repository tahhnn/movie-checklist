import useSWR from "swr";
async function fetcher(url : string) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  }
export function useGenres() {
    return useSWR(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, fetcher)
}
