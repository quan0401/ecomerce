import instance from "../axios/setup";

export const getToken = async () => await instance.get("/api/get-token");

export const clearToken = async () => await instance.get("/api/clear-token");
