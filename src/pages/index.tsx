import LineFilm from "@/components/LineFilm";
import ListCard from "@/components/ListCard";
import ListFilm from "@/components/ListFilm";
import LoginForm from "@/components/auth/LoginForm";
import MovieCreate from "@/components/movie/MovieCreate";
import MovieUpdate from "@/components/movie/MovieUpdate";
import { StoreContext } from "@/context";
import { useGenres } from "@/swr/useGenres";
import { Box, Modal } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
type Props = {};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "scroll",
};
const style2 = {
  ...style,
  width: 700,
  height: "fit-content",

  overflowY: "hidden",
  overflowX: "hidden",
};
const style3 = {
  ...style,
  width: 700,
  height: "fit-content",

  overflowY: "hidden",
  overflowX: "hidden",
};
const Home = (props: Props) => {
  const {
    count,
    open,
    setOpen,
    storedValue,
    setValue,
    isLoginFormOpen,
    setOpenLoginForm,
    onCreate,
    setOnCreate,
   
  } = useContext<any>(StoreContext);
  const { data: genres } = useGenres();
  const handleSetItem = (item: any) => {
    setValue((prev: any) => {
      return prev.filter((i: any) => i.id !== item.id);
    });
  };
  return (
    <>
      <div className="container">
        <LineFilm />
        <ListFilm />
        <ListCard />
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <p>
              <span className="font-bold">Watch list</span> ({count})
            </p>
            <div className="">
              {storedValue.map((item: any) => {
                const genresName = genres?.filter((i: any) => {
                  return item.genre_ids?.includes(i.id);
                });

                return (
                  <>
                    {" "}
                    <div className="flex justify-between items-center m-4">
                      <div>
                        <p className="text-xl">{item.title}</p>
                        <div className="flex gap-6 mb-1">
                          {genresName?.map((i: any) => (
                            <p className="p-1 bg-red-400 text-white rounded-xl">
                              {i.name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <img
                          width={100}
                          src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                          alt=""
                        />
                        <button
                          className="p-3 bg-red-400 rounded-xl text-white font-bold mt-2 translate-x-[50%]"
                          onClick={() => handleSetItem(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </Box>
        </Modal>
        <Modal open={isLoginFormOpen} onClose={() => setOpenLoginForm(false)}>
          <Box sx={style2}>
            <LoginForm />
          </Box>
        </Modal>
        <Modal open={onCreate} onClose={() => setOnCreate(false)}>
          <Box sx={style3}>
            <MovieCreate />
          </Box>
        </Modal>
        
      </div>
    </>
  );
};

export default Home;
