import React, { Reducer, useContext } from "react";
import { reducer } from "./Actions";
import { GlobalState } from "./interfaces";

const initialState: GlobalState = {
  loggedIn: false,
  loggedInUser: null,
};

export const Store = React.createContext<GlobalState | any>(initialState);

export function StoreProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [globalState, globalDispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, globalDispatch }}>
      {children}
    </Store.Provider>
  );
}

export const UseGlobalContext = () => useContext(Store);
