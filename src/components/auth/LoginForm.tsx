import React, { useContext } from "react";
import logo from "../../../public/import-png";
import { StoreContext } from "@/context";
import { useForm } from "react-hook-form";
import { AuthApi } from "@/instance/auth";
type Props = {};

const LoginForm = (props: Props) => {
  const { toggle, setFormToggle } = useContext<any>(StoreContext);
  const { register: registerLogin, handleSubmit: handleSubmitLogin, reset: resetLogin } = useForm();
  const { register: registerRegister, handleSubmit: handleSubmitRegister, reset: resetRegister } = useForm();

  const onSubmit = (data: any) => {
    AuthApi.login(data);
    resetLogin();
  }
  const registerSubmit = (data: any) => {
    AuthApi.register(data);
    resetRegister();
  }
  return (
    <>
      <p className="p__head--title">{toggle ? "Login" : "Register"}</p>
      <div className={`div__container--login `}>
        <div
          className={`div__banner ${
            toggle
              ? "translate-x-[100%] transition-all delay-75 ease-linear"
              : "transition-all delay-75 ease-linear"
          }  `}
        >
          <img className=" bg-red-500" src={logo.default.src} alt="" />
        </div>
        <form onSubmit={handleSubmitLogin(onSubmit)} className="form__form--login">
          <div className="div__box--login">
            <div className="div__label--login">
              <label htmlFor="">UserName</label>
            </div>
            <input
              {...registerLogin("email")}
              className="input__input--login"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="div__box--login">
            <div className="div__label--login">
              <label htmlFor="">Password</label>
            </div>
            <input
              {...registerLogin("password")}
              className="input__input--login"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="btn__btn--login">Login</button>
        </form>

        <form onSubmit={handleSubmitRegister(registerSubmit)} className="form__form--register">
          <div className="div__box--register">
            <div className="div__label--register">
              <label htmlFor="">UserName</label>
            </div>
            <input {...registerRegister("email")}
              className="input__input--register"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="div__box--register">
            <div className="div__label--register">
              <label htmlFor="">Password</label>
            </div>
            <input {...registerRegister("password")}
              className="input__input--register"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="btn__btn--register">Register</button>
        </form>
      </div>
      {toggle ? (
        <button
          className="p__footer--title-login"
          onClick={() => setFormToggle(false)}
        >
          {" "}
          Register?
        </button>
      ) : (
        <button
          className="p__footer--title-register"
          onClick={() => setFormToggle(true)}
        >
          Login?
        </button>
      )}
    </>
  );
};

export default LoginForm;
