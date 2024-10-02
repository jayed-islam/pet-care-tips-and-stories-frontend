/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useGetMeQuery } from "./reducers/auth/authApi";
import { isValidToken } from "@/auth/utils";
import { logout, setToken } from "./reducers/auth/authSlice";
import { usePathname } from "next/navigation";

import { PersistGate } from "redux-persist/integration/react";

interface IReudxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: FC<IReudxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GLobalApiCallProvider>{children}</GLobalApiCallProvider>
      </PersistGate>
    </Provider>
  );
};

const GLobalApiCallProvider: FC<IReudxProviderProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  useGetMeQuery(undefined, {
    skip: !(accessToken && isValidToken(accessToken)),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");
    if (token && isValidToken(token)) {
      dispatch(setToken(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return <>{children}</>;
};
