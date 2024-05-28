import { Content } from "@/interface";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface StoreContext {
  storedValue: Record<string, any>;
  setValue: Dispatch<SetStateAction<Record<string, []> | []>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean
}
export const StoreContext = createContext<StoreContext | null>(null);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedValue,setValue] = useLocalStorage<Record<string, any>>('checkList', [])
  const [count,setCount] = useState(0)
  const [open,setOpen] = useState(false)
  useEffect(() => {
    setCount(storedValue.length)
  },[storedValue])
  return <StoreContext.Provider value={{setValue,storedValue,setCount,count,setOpen,open}}>{children}</StoreContext.Provider>;
};
