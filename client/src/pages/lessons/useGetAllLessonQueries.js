import { useQuery } from "@tanstack/react-query";

import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";

function useGetAllLessonQueries() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => get(SERVER_ENDPOINTS.GET_ALL_LESSONS),
    // TODO - change this property with more accurate method to resolve situation with infinity refetch data on error
    initialData: [],
  });

  return { isLoading, isError, error, data };
}

export { useGetAllLessonQueries };
