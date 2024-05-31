import Uploady from "@rpldy/uploady";
import React, { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FilmApi } from "@/instance/film";
import { useGenres } from "@/swr/useGenres";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreContext } from "@/context";
import { useFilm } from "@/swr/useFilm";
import { useRouter } from "next/router";
type Props = {};

const MovieUpdate = ({ item, handleSuccess }: any) => {
  const { setOnUpdate } = useContext<any>(StoreContext);
  const route = useRouter();
  const itemUpdate = useMemo(() => {
    return item;
  }, []);
  const { data: dataFilm, mutate } = useFilm();
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
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { data: genres } = useGenres();

  const onSubmit = async (data: any) => {
    const formData = {
      title: data.title,
      vote_average: data.vote_average,
      genre_ids: data.genre_ids.map(Number),
      poster_path: data.poster_path,
    };
    FilmApi.updateFilm(formData, item.id).then(() => {
      route.push("/");
      handleSuccess();
    })
    
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
            defaultValue={itemUpdate?.title}
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
            type="text"
            {...register("vote_average", { valueAsNumber: true })}
            placeholder="Enter Point"
            defaultValue={itemUpdate?.vote_average}
            pattern="[0-9]*[.,]?[0-9]*"
          />
          <p className="p__error">
            {errors ? errors.vote_average?.message : ""}
          </p>
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
                  defaultChecked={itemUpdate?.genre_ids?.includes(+i?.id)}
                />
                <span>{i?.name}</span>
              </div>
            ))}
            <p className="p__error">
              {errors ? errors.genre_ids?.message : ""}
            </p>
          </div>
        </div>

        <div className="div__box--input">
          <div>
            <label htmlFor="">Image</label>
          </div>
          <input
            className={`input__input--create ${
              errors ? `outline-red-500` : ""
            }`}
            type="text"
            {...register("poster_path")}
            placeholder="Enter image url"
            defaultValue={itemUpdate?.poster_path}
          />
          <p className="p__error">
            {errors ? errors.poster_path?.message : ""}
          </p>
        </div>
        <div className="div__box--submit">
          <button className="btn__btn--submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MovieUpdate;
