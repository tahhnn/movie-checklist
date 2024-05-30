import { Content } from "@/interface";
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
  loginStored: Record<string, any>;
  setLoginStored: Dispatch<SetStateAction<Record<string, any>>>;
  setFormToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  onCreate: boolean;
  setOnCreate: Dispatch<SetStateAction<boolean>>;
}
export const StoreContext = createContext<StoreContext | null>(null);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedValue, setValue] = useLocalStorage<Record<string, any>>(
    "checkList",
    []
  );
  const [loginStored, setLoginStored] = useLocalStorage("isLogin", {});
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const [isLogin, setLogin] = useState(false);
  const [toggle, setFormToggle] = useState(false);
  const [isLoginFormOpen, setOpenLoginForm] = useState(false);

  const [onCreate, setOnCreate] = useState(false);
  useEffect(() => {
    setCount(storedValue.length);
  }, [storedValue]);
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
