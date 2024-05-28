import React, { useState } from "react";
import Card from "./Card";
import { useFilm } from "@/swr/useFilm";
import { useGenres } from "@/swr/useGenres";

type Props = {};


const ListCard = (props: Props) => {
    
    
    const {data,error,isLoading} = useFilm()      
    if(isLoading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-6 overflow-x-scroll-scroll gap-3 mt-5">
      {data?.results.slice(0,6).map((item: any) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListCard;
