import api from "./axios";
import type { Dispatch } from "../types/dispatch";

export const getDispatchQueue = async (): Promise<Dispatch[]> => {

  const response = await api.get("/dispatch/queue");

  return response.data;
};