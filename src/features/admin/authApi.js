import { baseRequest } from "@/utils/baseApi";

const BASE_URI = import.meta.env.VITE_AUTH_BASE_URI;

function request(endpoint = "", method = "GET", body = undefined) {
  return baseRequest(BASE_URI + endpoint, method, body);
}

export function login(username, password) {
  return request("/login", "POST", { username, password }).then((data) => {
    sessionStorage.setItem("token", data.token);
    return data.token;
  });
}
