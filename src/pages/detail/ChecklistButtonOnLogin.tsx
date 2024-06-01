import { StoreContext } from "@/context";
import React, { useContext, useMemo } from "react";

type Props = {
  data: any;
};

const ChecklistButtonOnLogin = ({ data }: Props) => {
  const { handleCheckList, handleRemoveCheckList, isLogin, storedValue } =
    useContext<any>(StoreContext);
  const isOnCheckList = useMemo(() => {
    return storedValue?.some((i: any) => i.id === data?.id);
  }, [storedValue, data]);
  return (
    <div>
      {" "}
      {isLogin && (
        <div>
          {isOnCheckList ? (
            <button
              className=" btn__btn--watchlist"
              onClick={() => {
                handleRemoveCheckList(data);
              }}
            >
              Added
            </button>
          ) : (
            <button
              className="btn__btn--watchlist"
              onClick={() => {
                handleCheckList(data);
              }}
            >
              Watch List
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChecklistButtonOnLogin;
