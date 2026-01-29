import api from "../lib/axios";

export const signup = (data) => api.post("/signup", data);

export const login = (data) => api.post("/login", data);

export const logout = () => api.post("/logout");

export const getMe = () => api.get("/me");
