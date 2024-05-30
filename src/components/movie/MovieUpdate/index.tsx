import Uploady from "@rpldy/uploady";
import React from "react";
import { useForm } from "react-hook-form";
import { FilmApi } from "@/instance/film";
import { useGenres } from "@/swr/useGenres";

type Props = {};

const MovieUpdate = ({ item }: any) => {
  const { register, handleSubmit } = useForm();
  const { data: genres} = useGenres();

  const onSubmit = (data: any) => {
    FilmApi.updateFilm(data,item.id);
  };

  return (
    <div className="div__container--createForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form__form--createForm"
      >
        <p className="p__head--title-create">Add Movie</p>
        <div className="div__box--input">
          <div className="div__box--input-input">
            {" "}
            <label htmlFor="">Name</label>
          </div>
          <input
            className="input__input--create"
            type="text"
            {...register("title")}
            placeholder="Enter film name"
            defaultValue={item?.title}
          />
        </div>
        <div className="div__box--input">
          <div className="div__box--input-input">
            {" "}
            <label htmlFor="">Point</label>
          </div>
          <input
            className="input__input--create"
            type="number"
            {...register("vote_average")}
            placeholder="Enter Point"
            min={0}
            max={10}
            defaultValue={item?.vote_average}
          />
        </div>
        <div className="div__box--input-checkbox">
          <div className="div__box--input-input">
            <label htmlFor="">Genres</label>
          </div>
          <div className="div__box--listgenres">
            {genres?.map((i: any) => (
              <div key={i.id}>
                <input
                  type="checkbox"
                  {...register("genre_ids")}
                  value={i?.id}
                  checked={item?.genre_ids?.includes(+i?.id)}
                />
                <span>{i?.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="div__box--input">
          <div>
            <label htmlFor="">Image</label>
          </div>
          <input
            className="input__input--create"
            type="text"
            {...register("poster_path")}
            placeholder="Enter image url"
            defaultValue={item?.poster_path}
          />
        </div>
        <div className="div__box--submit">
          <button className="btn__btn--submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MovieUpdate;
