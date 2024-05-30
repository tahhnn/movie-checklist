import { getFilmTopRate } from "@/swr/useFilm";
import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";

type Props = {};

const LineFilm = (props: Props) => {
  const { data, isLoading } = getFilmTopRate();
  const dataAdventure = data
    ?.filter((item: any) => item.genre_ids.includes(12))
    .find((i: any) => Math.max(i.vote_average));
  const dataAction = data
    ?.filter((item: any) => item.genre_ids.includes(28))
    .find((i: any) => Math.max(i.vote_average));
  const dataAnimation = data
    ?.filter((item: any) => item.genre_ids.includes(16))
    .find((i: any) => Math.max(i.vote_average));
  const dataCrime = data
    ?.filter((item: any) => item.genre_ids.includes(80))
    .find((i: any) => Math.max(i.vote_average));

  return (
    <div className="grid grid-cols-4">
      {isLoading ? (
        <div className="mt-3 mr-3">
          <Skeleton variant="rectangular" animation="wave" height={488} />
        </div>
      ) : (
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${dataAction?.poster_path}`}
            alt=""
          />
          <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Action</p>
            <hr />
            <p className="font-bold text-3xl text-white">{dataAction?.title}</p>
          </span>
        </div>
      )}
      {isLoading ? (
        <div className="mt-3 mr-3">
          <Skeleton variant="rectangular" animation="wave" height={488} />
        </div>
      ) : (
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${dataAdventure?.poster_path}`}
            alt=""
          />
          <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Adventure</p>
            <hr />
            <p className="font-bold text-3xl text-white">
              {dataAdventure?.title}
            </p>
          </span>
        </div>
      )}
      {isLoading ? (
        <div className="mt-3 mr-3">
          <Skeleton variant="rectangular" animation="wave" height={488} />
        </div>
      ) : (
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${dataAnimation?.poster_path}`}
            alt=""
          />
          <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Animation</p>
            <hr />
            <p className="font-bold text-3xl text-white">
              {dataAnimation?.title}
            </p>
          </span>
        </div>
      )}
      {isLoading ? (
        <div className="mt-3 mr-3">
          <Skeleton variant="rectangular" animation="wave" height={488} />
        </div>
      ) : (
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${dataCrime?.poster_path}`}
            alt=""
          />
          <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Crime</p>
            <hr />
            <p className="font-bold text-3xl text-white">{dataCrime?.title}</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default LineFilm;
