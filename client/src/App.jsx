import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DarkModeProvider } from "./context/DarkMode.jsx";
import { LanguageProvider } from "./context/Language.jsx";
import { AutContextProvider } from "./context/AuthContext.jsx";

import AppLayout from "./ui/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "./pages/home/Home.jsx";
import LessonsList from "./pages/lessons/LessonsList.jsx";
import ToasterComponent from "./ui/elements/toaster/ToasterComponent.jsx";
import Profile from "./pages/user/Profile.jsx";
import UserInfo from "./features/users/UserInfo.jsx";
import UpdateUser from "./features/users/UpdateUser.jsx";
import SkatersList from "./features/users/SkatersList.jsx";
import History from "./features/users/History.jsx";
import { PathContextProvider } from "./context/PathContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <PathContextProvider>
            <div style={{ fontSize: "16px" }}>
              <ReactQueryDevtools initialIsOpen={false} />
            </div>
            <AutContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to={"home"} />} />
                    <Route path={"home"} element={<Home />} />
                    <Route path={"lessons"} element={<LessonsList />} />
                    <Route path={"profile/*"} element={<Profile />}>
                      <Route index element={<UserInfo />} />
                      <Route path={"edit"} element={<UpdateUser />} />
                      <Route path={"skaters"} element={<SkatersList />} />
                      <Route path={"history"} element={<History />} />
                    </Route>
                  </Route>
                  {/* <Route path={"login"} element={<Login />} /> */}
                  <Route path={"*"} element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>
              <ToasterComponent />
            </AutContextProvider>
          </PathContextProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;
