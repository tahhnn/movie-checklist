import { StoreContext } from "@/context";
import { Content } from "@/interface";
import { useGenres } from "@/swr/useGenres";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Card = ({ item, isLoading, isValidating }: Content) => {
  const {
    storedValue,
    setValue,
    handleRemoveCheckList,
    handleCheckList,
    isLogin,
    setOpenLoginForm,
    handleError,
  } = useContext<any>(StoreContext);

  const [isOnChecklist, setToChecklist] = useState<boolean>(false);
  const { data: genres } = useGenres();
  const genresName = genres?.filter((i: any) => {
    return item.genre_ids?.includes(+i.id);
  });

  useEffect(() => {
    if (storedValue?.find((i: any) => i.id === item.id)) {
      setToChecklist(true);
    }
    if (!storedValue?.find((i: any) => i.id === item.id)) {
      setToChecklist(false);
    }
  }, [storedValue]);
  return (
    <div className="relative">
      <img
        className="rounded-2xl"
        width={250}
        height={350}
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        alt=""
        onError={(e) => handleError(e, item?.poster_path)}
      />
      <Link
        href={`/detail/${item.id}`}
        className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[150%] border-4 p-4 rounded-3xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </Link>
      <p>{Math.floor((item.vote_average * 100) / 10)} Points</p>
      <p className="text-center mt-2 h-[50px] font-bold">{item?.title}</p>
      <span className="flex gap-3 justify-center">
        {genresName?.slice(0, 2).map((i: any) => (
          <p key={i.id} className="p-1 bg-red-400 text-white rounded-xl">
            {i.name}
          </p>
        ))}
      </span>
      {!isOnChecklist && (
        <button
          className="flex mx-auto mt-4 border-2 border-red-300 p-3 rounded-lg hover:bg-red-400 hover:text-white transition-all delay-75 ease-linear"
          onClick={() => {
            if (!isLogin) {
              setOpenLoginForm(true);
            } else {
              handleCheckList(item);
            }
          }}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <strong>Watchlist</strong>
        </button>
      )}
      {isOnChecklist && (
        <button
          className="flex mx-auto mt-4 border-2 border-red-300 p-3 rounded-lg hover:bg-red-400 hover:text-white transition-all delay-75 ease-linear"
          onClick={() => {
            handleRemoveCheckList(item);
          }}
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
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>

          <strong>Added</strong>
        </button>
      )}
    </div>
  );
};

export default Card;
