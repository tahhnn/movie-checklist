import { getFilmTopRate } from "@/swr/useFilm";
import { Skeleton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

type Props = {};

const MovieCard = ({ movie }: { movie: any }) => {
  
  return (
    <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
        alt=""
      />
      <span className="absolute bottom-10">
        <p className="text-xl text-white">Best of {movie?.genre}</p>
        <hr />
        <p className="font-bold text-3xl text-white">{movie?.title}</p>
      </span>
    </div>
  );
};

const LineFilm = React.memo((props: Props) => {
  const { data, isLoading } = getFilmTopRate();

  const movies = useMemo(() => {
    return [
      {
        genre: "Action",
        movie: data?.find((item: any) => item.genre_ids?.includes(28))
      },
      {
        genre: "Adventure",
        movie: data?.find((item: any) => item.genre_ids?.includes(12))
      },
      {
        genre: "Animation",
        movie: data?.find((item: any) => item.genre_ids?.includes(16))
      },
      {
        genre: "Crime",
        movie: data?.find((item: any) => item.genre_ids?.includes(80))
      }
    ];
  }, [data]);


  return (
    <div className="grid grid-cols-4">
      {isLoading ? (
        <div className="mt-3 mr-3">
          <Skeleton variant="rectangular" animation="wave" height={488} />
        </div>
      ) : (
        movies.map((movie, index) => (
          <MovieCard key={index} movie={movie.movie} />
        ))
      )}
    </div>
  );
});

export default LineFilm;
