import api from "./axios";

import type { TimeLog } from "../types/timeLog";

export const getAllTimeLogs = async (): Promise<TimeLog[]> => {
  const response = await api.get("/time-logs");
  return response.data;
};

export const getTimeLogsByWorkOrder = async (
  workOrderId: number
): Promise<TimeLog[]> => {
  const response = await api.get(
    `/time-logs/work-order/${workOrderId}`
  );
  return response.data;
};

export const getTimeLogsByTechnician = async (
  technicianId: number
): Promise<TimeLog[]> => {
  const response = await api.get(
    `/time-logs/technician/${technicianId}`
  );
  return response.data;
};

export const createTimeLog = async (
  timeLog: TimeLog
): Promise<TimeLog> => {
  const response = await api.post(
    "/time-logs",
    timeLog
  );
  return response.data;
};

export const deleteTimeLog = async (
  id: number
): Promise<void> => {
  await api.delete(`/time-logs/${id}`);
};