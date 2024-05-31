import { StoreContext } from "@/context";
import { getOneFilm, useFilm } from "@/swr/useFilm";
import { useGenres } from "@/swr/useGenres";
import {
  Box,
  Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MovieUpdate from "@/components/movie/MovieUpdate";
import { FilmApi } from "@/instance/film";
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
  const {
    handleCheckList,
    handleRemoveCheckList,
    storedValue,
    onUpdate,
    setOnUpdate,
  } = useContext<any>(StoreContext);
  const route = useRouter();
  
  const id = route.query.id;
  const { data } = getOneFilm(id);
  

  const { data: film, mutate, isLoading:filmLoading } = useFilm();
  
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

  const actions = [
    { icon: <AutoFixHighIcon />, name: "Fix", func: setOnUpdate },
    { icon: <DeleteIcon />, name: "Delete", func: handleDelete },
  ];
 
  const isOnCheckList = useMemo(() => {
    return storedValue?.some((i: any) => i.id === data?.id);
  }, [storedValue, data]);

  const handleSuccess = () => {
    setOnUpdate(false);
    mutate()
  }
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
            <strong>
              {Math.floor((data?.vote_average / 10) * 100)}%
            </strong>
          </p>

          <p>{data?.overview}</p>
          {isOnCheckList ? (
            <button
              className=" btn__btn--watchlist"
              onClick={() => {
                handleRemoveCheckList(data);
              }}
            >
              Added
            </button>
          ) : (
            <button
              className="btn__btn--watchlist"
              onClick={() => {
                handleCheckList(data);
              }}
            >
              Watch List
            </button>
          )}
        </div>{" "}
        <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  action.func(true);
                }}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <Modal open={onUpdate} onClose={() => setOnUpdate(false)}>
        <Box sx={style3}>
          <MovieUpdate item={data} handleSuccess={handleSuccess}/>
        </Box>
      </Modal>
    </>
  );
};

export default DetailMovie;
