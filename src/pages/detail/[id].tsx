import { StoreContext } from "@/context";
import { getOneFilm, useFilm } from "@/swr/useFilm";
import { useGenres } from "@/swr/useGenres";
import { useRouter } from "next/router";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { FilmApi } from "@/instance/film";
import ChecklistButtonOnLogin from "./ChecklistButtonOnLogin";
import BoxDial from "./BoxDial";
import UpdateModal from "./UpdateModal";
type Props = {};

const DetailMovie = (props: Props) => {
  const style3 = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",

    overflowY: "hidden",
    overflowX: "hidden",
  };
  const param = useRouter();
  const { onUpdate, setOnUpdate, isLogin } = useContext<any>(StoreContext);
  const route = useRouter();

  const id = route.query.id;
  const { data } = getOneFilm(id);

  const { data: film, mutate, isLoading: filmLoading } = useFilm();

  const { data: genres } = useGenres();
  const genresName = genres?.filter((i: any) => {
    return data?.genre_ids?.includes(+i.id);
  });

  const handleError = (e: any, poster_path: any) => {
    e.target.src = poster_path;
  };
  const handleDelete = () => {
    FilmApi.deleteFilm(data?.id).then(() => {
      mutate();
      route.push("/");
    });
  };

  const handleSuccess = () => {
    setOnUpdate(false);
    mutate();
  };
  // useEffect(() => {
  //   const existFilm = film?.find((i: any) => i.id === +data?.id);
  //   if (existFilm) {
  //     route.push('/404')
  //   }
  // },[id,film])
  return (
    <>
      <div className="div__container--detail">
        <div className="div__div--left-detail">
          <img
            width={500}
            height={750}
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            onError={(e) => handleError(e, data?.poster_path)}
            alt="ok"
          />
          <span className="flex gap-3 mt-3">
            {genresName?.map((i: any) => (
              <p
                key={i.id}
                className="p-2 text-2xl bg-red-400 text-white rounded-xl"
              >
                {i.name}
              </p>
            ))}
          </span>
        </div>
        <div className="div__div--right-detail">
          <p className="p__title">{data?.title}</p>
          <p>
            Rating:{" "}
            <strong>{Math.floor((data?.vote_average / 10) * 100)}%</strong>
          </p>

          <p>{data?.overview}</p>
          <ChecklistButtonOnLogin data={data} />
        </div>
        {isLogin && <BoxDial handleDelete={handleDelete} />}
      </div>
      {isLogin && (
        <UpdateModal
          style3={style3}
          onUpdate={onUpdate}
          handleSuccess={handleSuccess}
          data={data}
        />
      )}
    </>
  );
};

export default DetailMovie;
