import { Content } from "@/interface";
import { useFilm } from "@/swr/useFilm";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

interface StoreContext {
  storedValue: Record<string, any>;
  setValue: Dispatch<SetStateAction<Record<string, []> | []>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  isLogin: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
  isLoginFormOpen: boolean;
  setOpenLoginForm: Dispatch<SetStateAction<boolean>>;
  loginStored: boolean;
  setLoginStored: Dispatch<SetStateAction<boolean>>;
  setFormToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  onCreate: boolean;
  setOnCreate: Dispatch<SetStateAction<boolean>>;
  handleRemoveCheckList: (item: any) => void;
  handleCheckList: (item: any) => void;
  onUpdate: boolean;
  setOnUpdate: Dispatch<SetStateAction<boolean>>;
  storedData: Record<string, any>;
  setStoredData: Dispatch<SetStateAction<Record<string, any>>>;
  handleError: (e: any, poster_path: any) => void;
}
export const StoreContext = createContext<StoreContext | null>(null);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedValue, setValue] = useLocalStorage<Record<string, any>>(
    "checkList",
    []
  );
  const [storedData, setStoredData] = useLocalStorage("data", {});
  const { data: film } = useFilm();
  const [loginStored, setLoginStored] = useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const [isLogin, setLogin] = useState(false);
  const [toggle, setFormToggle] = useState(false);
  const [isLoginFormOpen, setOpenLoginForm] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const handleError = (e: any, poster_path: any) => {
    e.target.src = poster_path;
  };
  const handleRemoveCheckList = (item: any) => {
    setValue((prev: any) => {
      return prev.filter((i: any) => i.id !== item.id);
    });
  };

  const handleCheckList = (item: any) => {
    setValue((prev: any) => {
      return [...prev, { ...item }];
    });
  };

  useEffect(() => {
    setCount(storedValue.length);
  }, [storedValue]);
  useEffect(() => {
    setStoredData(film);
  }, [film]);
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");

    useEffect(() => {
      if (token && token.length > 0) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }, [token]);
  }
  return (
    <StoreContext.Provider
      value={{
        setValue,
        storedValue,
        setCount,
        count,
        setOpen,
        open,
        isLogin,
        setLogin,
        setOpenLoginForm,
        isLoginFormOpen,
        loginStored,
        setLoginStored,
        setFormToggle,
        toggle,
        onCreate,
        setOnCreate,
        handleRemoveCheckList,
        handleCheckList,
        onUpdate,
        setOnUpdate,
        storedData,
        setStoredData,
        handleError,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
