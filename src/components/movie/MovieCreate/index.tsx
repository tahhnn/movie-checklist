import Uploady from "@rpldy/uploady";
import React from "react";
import { useForm } from "react-hook-form";
import { FilmApi } from "@/instance/film";
import { useGenres } from "@/swr/useGenres";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { mutate } from "swr";

type Props = {};

const MovieCreate = (props: Props) => {
  const schema = z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: "Title is required" })
      .max(50, { message: "Title is too long" }),
    vote_average: z
      .number()
      .min(0, { message: "Enter Point" })
      .max(10, { message: "Maximum is 10" }),
    genre_ids: z
      .array(z.string())
      .min(1, { message: "Genre is required" })
      .max(5, { message: "Maximum is 5" }),
    poster_path: z.string().optional(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { data: genres } = useGenres();

  const onSubmit = (data: any) => {

    const formData = {
      title: data.title,
      vote_average: data.vote_average,
      genre_ids: data.genre_ids,
      poster_path: data.poster_path,
    };
    FilmApi.addFilm(formData);
   
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
            className={`input__input--create ${
              errors ? `outline-red-500` : ""
            }`}
            type="text"
            {...register("title")}
            placeholder="Enter film name"
          />
          <p className="p__error">{errors ? errors.title?.message : ""}</p>
        </div>
        <div className="div__box--input">
          <div className="div__box--input-input">
            {" "}
            <label htmlFor="">Point</label>
          </div>
          <input
            className={`input__input--create ${
              errors ? `outline-red-500` : ""
            }`}
            type="number"
            {...register("vote_average", { valueAsNumber: true })}
            placeholder="Enter Point"
            min={0}
            max={10}
          />
          <p className="p__error" className="p__error">{errors ? errors.vote_average?.message : ""}</p>
        </div>

        <div className="div__box--input-checkbox">
          <div className="div__box--input-input">
            <label htmlFor="">Genres</label>
          </div>
          <div className="div__box--listgenres">
            {genres?.map((item: any) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  {...register("genre_ids")}
                  value={+item.id}
                />{" "}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
            <p  className="p__error">{errors ? errors.genre_ids?.message : ""}</p>
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
          />
        </div>
        <div className="div__box--submit">
          <button className="btn__btn--submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MovieCreate;
