import { StoreContext } from "@/context";
import React, { useContext } from "react";

type Props = {
  dataSearch: any;
};

const Search = ({ dataSearch }: Props) => {
  return (
    <div className="div__search-box bg-white absolute z-10 w-[600px]">
      {dataSearch?.slice(0, 5).map((i: any) => {
        return (
          <>
            <p className="p-4">{i?.title}</p>
          </>
        );
      })}
    </div>
  );
};

export default Search;
