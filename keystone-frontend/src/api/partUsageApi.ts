import api from "./axios";

import type { PartUsage } from "../types/partUsage";

export const getAllPartUsage = async (): Promise<PartUsage[]> => {
  const response = await api.get("/part-usage");
  return response.data;
};

export const getPartUsageByWorkOrder = async (
  workOrderId: number
): Promise<PartUsage[]> => {
  const response = await api.get(
    `/part-usage/work-order/${workOrderId}`
  );
  return response.data;
};

export const createPartUsage = async (
  partUsage: PartUsage
): Promise<PartUsage> => {
  const response = await api.post(
    "/part-usage",
    partUsage
  );
  return response.data;
};

export const deletePartUsage = async (
  id: number
): Promise<void> => {
  await api.delete(`/part-usage/${id}`);
};