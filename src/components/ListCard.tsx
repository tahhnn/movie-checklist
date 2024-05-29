import React, { useState } from "react";
import Card from "./Card";
import { useFilm } from "@/swr/useFilm";

type Props = {};

const ListCard = (props: Props) => {
  const { data, isLoading } = useFilm();

  return (
    <div className="grid grid-cols-6 overflow-x-scroll-scroll gap-3 mt-5">
      {data?.map((item: any) => (
        <Card key={item.id} item={item} isLoading={isLoading} />
      ))}
      <button className="">
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
    </div>
  );
};

export default ListCard;
