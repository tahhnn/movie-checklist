export type Content = {
    item: {
      id: number | string;
      poster_path: string;
      vote_average: number;
      title: string;
      genre_ids: [string | number];
      aldult: boolean;
      backdrop_path: string;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      release_date: string;
      video: boolean;
      vote_count: number;
    };
    isLoading: boolean
  };