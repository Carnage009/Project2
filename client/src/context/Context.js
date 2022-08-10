import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducers";

const INITIAL_VALUE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  currentPage: 1,
};

export const Context = createContext(INITIAL_VALUE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_VALUE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        currentPage: state.currentPage,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
