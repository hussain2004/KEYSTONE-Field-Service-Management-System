import api from "./axios";
import type { Technician } from "../types/technician";

const API_URL = "/technicians";

export const getAllTechnicians = async (): Promise<Technician[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const getTechnicianById = async (
  id: number
): Promise<Technician> => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTechnician = async (
  technician: Technician
): Promise<Technician> => {
  const response = await api.post(API_URL, technician);
  return response.data;
};

export const updateTechnician = async (
  id: number,
  technician: Technician
): Promise<Technician> => {
  const response = await api.put(
    `${API_URL}/${id}`,
    technician
  );

  return response.data;
};

export const deleteTechnician = async (
  id: number
): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};