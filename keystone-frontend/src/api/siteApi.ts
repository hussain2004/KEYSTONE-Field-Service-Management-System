import api from "./axios";
import type { Site } from "../types/site";

const API_URL = "http://localhost:8080/api/sites";

export const getAllSites = async (): Promise<Site[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const getSiteById = async (
  id: number
): Promise<Site> => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createSite = async (
  site: Site
): Promise<Site> => {
  const response = await api.post(API_URL, site);
  return response.data;
};

export const updateSite = async (
  id: number,
  site: Site
): Promise<Site> => {
  const response = await api.put(
    `${API_URL}/${id}`,
    site
  );

  return response.data;
};

export const deleteSite = async (
  id: number
): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};