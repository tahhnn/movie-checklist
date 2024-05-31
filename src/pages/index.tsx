import LineFilm from "@/components/LineFilm";
import ListCard from "@/components/ListCard";
import ListFilm from "@/components/ListFilm";
import LoginForm from "@/components/auth/LoginForm";
import MovieCreate from "@/components/movie/MovieCreate";
import MovieUpdate from "@/components/movie/MovieUpdate";
import { StoreContext } from "@/context";
import { useGenres } from "@/swr/useGenres";
import { Box, Modal } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
type Props = {};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "scroll",
};
const style2 = {
  ...style,
  width: 700,
  height: "fit-content",

  overflowY: "hidden",
  overflowX: "hidden",
};
const style3 = {
  ...style,
  width: 700,
  height: "fit-content",

  overflowY: "hidden",
  overflowX: "hidden",
};
const Home = (props: Props) => {
  const {
    
    isLoginFormOpen,
    setOpenLoginForm,
    onCreate,
    setOnCreate,
  } = useContext<any>(StoreContext);
  
  return (
    <>
      <div className="container">
        <LineFilm />
        <ListFilm />
        <ListCard />
        
        <Modal open={isLoginFormOpen} onClose={() => setOpenLoginForm(false)}>
          <Box sx={style2}>
            <LoginForm />
          </Box>
        </Modal>
        <Modal open={onCreate} onClose={() => setOnCreate(false)}>
          <Box sx={style3}>
            <MovieCreate />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Home;
