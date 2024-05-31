import React, { Dispatch, useContext, useEffect, useState } from "react";
import logo from "../../public/import-png";
import { StoreContext } from "@/context";
import Search from "./Search";

type Props = {};

const Nav = (props: Props) => {
  const { count, setOpen, isLogin,setOpenLoginForm,setLogin } = useContext<any>(StoreContext);
  const [onSearch,setOnSearch] = useState()
  const handleLogOut = () => { 
    setLogin(false);
    localStorage.clear();
    
  }
  return (
    <div className="bg-[#fa320a] flex p-6 justify-between items-center">
      <img className="" width={160} height={50} src={logo.default.src} alt="" />
      <span className="w-1/3">
        <input
          className="w-full py-3 pl-5 rounded-lg"
          type="text"
          placeholder="Search movies, TV, actors, more..."
          onChange={() => {
            setOnSearch(true);
          }}
        />
        <Search/>
      </span>
      <ul className="flex gap-8">
        <li className=" hover:bg-white p-3">MOVIES</li>
        <li className=" hover:bg-white p-3">TV SHOWS</li>
        <li className=" hover:bg-white p-3">SHOP</li>
        <li className=" hover:bg-white p-3">NEWS</li>
        {!isLogin ? (
          <li className=" hover:bg-white p-3 font-bold cursor-pointer" onClick={() => setOpenLoginForm(true)}>
            Login
          </li>
        ) : (
          <div>
            <li
            className=" hover:bg-white p-3 font-bold cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Watch list
          </li>
          <li
          className=" hover:bg-white p-3 font-bold cursor-pointer"
          onClick={() => handleLogOut()}
        >
          Log out
        </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Nav;
