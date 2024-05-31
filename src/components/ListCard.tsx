import React, { useContext, useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { useFilm } from "@/swr/useFilm";
import { StoreContext } from "@/context";
import { Skeleton } from "@mui/material";

type Props = {};

const ListCard = (props: Props) => {
  const { setOnCreate } = useContext<any>(StoreContext);
  
  const { data, isLoading, isValidating, mutate } = useFilm();
  const dataCard = useMemo(() => {
    return data;
  },[data])
  
  return (
    <div className="grid grid-cols-6 overflow-x-scroll-scroll gap-3 mt-5">
      {isLoading && isValidating ? (
        <>
          <div>
            <Skeleton variant="rectangular" animation="wave" height={388} />
            <Skeleton width={"25%"} />
            <Skeleton width={"100%"} />
            <div className="flex gap-2 mt-5">
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"40%"}
                height={10}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"40%"}
                height={10}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {dataCard?.map((item: any) => (
        <Card
          key={item.id}
          item={item}
          isLoading={isLoading}
          isValidating={isValidating}
        />
      ))}
      <button onClick={() => setOnCreate(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-20 mx-auto rounded-lg transition-all delay-50 ease-linear text-white bg-[#fa320a] p-2 hover:bg-[#873434]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
        </>
      )
    }
    </div>
  );
};

export default ListCard;
