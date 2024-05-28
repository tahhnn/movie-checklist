import React from "react";

type Props = {};

const LineFilm = (props: Props) => {
  return (
    <div className="grid grid-cols-4">
      <div className="relative">
        <img src="https://picsum.photos/500/400" alt="" />
        <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Horror</p>
            <hr />
            <p className="font-bold text-3xl text-white">Incantation</p>
        </span>
      </div>
      <div className="relative">
        <img src="https://picsum.photos/500/400" alt="" />
        <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Horror</p>
            <hr />
            <p className="font-bold text-3xl text-white">Incantation</p>
        </span>
      </div>
      <div className="relative">
        <img src="https://picsum.photos/500/400" alt="" />
        <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Horror</p>
            <hr />
            <p className="font-bold text-3xl text-white">Incantation</p>
        </span>
      </div>
      <div className="relative">
        <img src="https://picsum.photos/500/400" alt="" />
        <span className="absolute bottom-10">
            <p className="text-xl text-white">Best of Horror</p>
            <hr />
            <p className="font-bold text-3xl text-white">Incantation</p>
        </span>
      </div>
     
    </div>
  );
};

export default LineFilm;
