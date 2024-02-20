import { createContext, useContext, useState } from "react";

const PathContext = createContext();

function PathContextProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname.split("/").at(-1));

  function newPath(newPath) {
    setPath((p) => (p = newPath));
  }

  return (
    <PathContext.Provider value={{ path, newPath }}>
      {children}
    </PathContext.Provider>
  );
}

function usePath() {
  const context = useContext(PathContext);

  if (context === undefined)
    throw new Error("Path context is used outside the context provider");

  return context;
}

export { PathContextProvider, usePath };
