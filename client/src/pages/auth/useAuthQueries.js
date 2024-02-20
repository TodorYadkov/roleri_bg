import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { post, get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useMoveBack } from "../../hooks/useMoveBack.js";

function useAuthQueries() {
  const queryClient = useQueryClient();
  const { addUserHandler, removeUserHandler } = useAuthContext();

  const { redirectTo } = useMoveBack();

  const loginMutation = useMutation({
    enabled: false,
    mutationFn: (userData) => post(SERVER_ENDPOINTS.LOGIN, userData),
    onSuccess: (userData) => {
      toast.success("Login success!");
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      addUserHandler(userData);

      redirectTo("/lessons");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    enabled: false,
    mutationFn: (userData) => post(SERVER_ENDPOINTS.REGISTER, userData),
    onSuccess: (userData) => {
      toast.success("Registration success!");
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      addUserHandler(userData);

      redirectTo("/lessons");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    enabled: false,
    mutationFn: () => get(SERVER_ENDPOINTS.LOGOUT),
    onSuccess: () => {
      toast.success("Logout successfully!");
      // Clear the user data from the cache
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      // Clear the user data from the local storage
      removeUserHandler();

      redirectTo("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
}

export { useAuthQueries };
