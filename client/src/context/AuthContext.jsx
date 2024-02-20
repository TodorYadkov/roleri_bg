import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { USER_LOCAL_STORAGE_KEY } from "../services/environment.js";

const AuthContext = createContext();

function AutContextProvider({ children }) {
  const queryClient = useQueryClient();

  function addUserHandler(data) {
    return localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data))
  }


  function getUserHandler() {
    return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)) ?? null;
  }

  function removeUserHandler() {
    return localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  function checkIsUserLoggedIn() {
    return queryClient.getQueryData(["user"]) ?? !!getUserHandler();
  }

  const values = {
    addUserHandler,
    getUserHandler,
    removeUserHandler,
    checkIsUserLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext is used outside the context provider");
  }

  return context;
}

export { AutContextProvider, useAuthContext };
