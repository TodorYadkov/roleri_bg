import { useQuery } from "@tanstack/react-query";

import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";

function useGetAllNewsQueries() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["news"],
        queryFn: () => get(SERVER_ENDPOINTS.GET_ALL_NEWS),
        initialData: [],
    });

    return { isLoading, isError, error, data };
}

export { useGetAllNewsQueries };
