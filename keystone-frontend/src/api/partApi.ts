import api from "./axios";
import type { Part } from "../types/part";

export const getAllParts = async (): Promise<Part[]> => {
  const response = await api.get("/parts");
  return response.data;
};

export const getPartById = async (
  id: number
): Promise<Part> => {
  const response = await api.get(`/parts/${id}`);
  return response.data;
};

export const createPart = async (
  part: Part
): Promise<Part> => {
  const response = await api.post("/parts", part);
  return response.data;
};

export const updatePart = async (
  id: number,
  part: Part
): Promise<Part> => {
  const response = await api.put(
    `/parts/${id}`,
    part
  );

  return response.data;
};

export const deletePart = async (
  id: number
): Promise<void> => {
  await api.delete(`/parts/${id}`);
};