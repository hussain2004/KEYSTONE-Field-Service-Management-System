import api from "./axios";
import type { RecentWorkOrder } from "../types/recentWorkOrder";
import type { Activity } from "../types/activity";

const API_URL = "http://localhost:8080/api/dashboard";

export interface DashboardResponse {
  customerCount: number;
  siteCount: number;
  userCount: number;
  technicianCount: number;
  workOrderCount: number;
  partCount: number;
  partUsageCount: number;
  timeLogCount: number;
}

export const getDashboardStats = async (): Promise<DashboardResponse> => {
  const response = await api.get(API_URL);
  return response.data;
};

export const getRecentWorkOrders = async (): Promise<RecentWorkOrder[]> => {
  const response = await api.get(
    `${API_URL}/recent-work-orders`
  );

  return response.data;
};

export const getTodaysActivity = async (): Promise<Activity[]> => {
  const response = await api.get(
    `${API_URL}/todays-activity`
  );

  return response.data;
};