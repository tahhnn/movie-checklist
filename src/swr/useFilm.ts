import useSWR from "swr";
async function fetcher(url : string) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  }
export function useFilm () {
    return useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, fetcher)
}
export function getFilmTopRate(){
    return useSWR(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, fetcher)
}