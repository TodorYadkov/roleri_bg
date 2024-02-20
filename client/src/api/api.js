import { BASE_URL } from "../services/environment.js";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
    credentials: "include",
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(BASE_URL + url, options);

  if (response.ok == false) {
    if (response.status == 403) {
      // clear cookie data
      document.cookie = "";
    }

    const error = await response.json();

    throw error;
  }

  const result = await response.json();

  return result;
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");
