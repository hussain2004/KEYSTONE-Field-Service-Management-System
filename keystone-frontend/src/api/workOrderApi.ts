import api from "./axios";
import type { WorkOrder } from "../types/workOrder";

const API_URL = "/work-orders";

export const getAllWorkOrders = async (): Promise<WorkOrder[]> => {
  const response = await api.get(API_URL);
  return response.data;
};
export const getWorkOrdersByTechnician = async (
  technicianId: number
): Promise<WorkOrder[]> => {

  const response = await api.get(
    `${API_URL}/technician/${technicianId}`
  );

  return response.data;

};

export const getWorkOrderById = async (
  id: number
): Promise<WorkOrder> => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createWorkOrder = async (
  workOrder: WorkOrder
): Promise<WorkOrder> => {
  const response = await api.post(API_URL, workOrder);
  return response.data;
};

export const updateWorkOrder = async (
  id: number,
  workOrder: WorkOrder
): Promise<WorkOrder> => {
  const response = await api.put(
    `${API_URL}/${id}`,
    workOrder
  );

  return response.data;
};

export const deleteWorkOrder = async (
  id: number
): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};

export const assignTechnician = async (
  workOrderId: number,
  technicianId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/assign`,
    { technicianId }
  );

  return response.data;
};

export const startWork = async (
  workOrderId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/start`
  );

  return response.data;
};

export const holdWork = async (
  workOrderId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/hold`
  );

  return response.data;
};

export const resumeWork = async (
  workOrderId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/resume`
  );

  return response.data;
};

export const completeWork = async (
  workOrderId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/complete`
  );

  return response.data;
};

export const closeWork = async (
  workOrderId: number
) => {
  const response = await api.put(
    `${API_URL}/${workOrderId}/close`
  );

  return response.data;
};

export const getStatusHistory = async (
  workOrderId: number
) => {
  const response = await api.get(
    `/work-orders/${workOrderId}/history`
);

  return response.data;
};