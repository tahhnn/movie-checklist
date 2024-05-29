import React, { useState } from "react";
import Card from "./Card";
import { useFilm } from "@/swr/useFilm";

type Props = {};

const ListCard = (props: Props) => {
  const { data, isLoading } = useFilm();

  return (
    <div className="grid grid-cols-6 overflow-x-scroll-scroll gap-3 mt-5">
      {data?.results.slice(0, 6).map((item: any) => (
        <Card key={item.id} item={item} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default ListCard;
