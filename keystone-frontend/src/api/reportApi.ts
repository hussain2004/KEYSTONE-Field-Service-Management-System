import api from "./axios";
import type { DashboardReport } from "../types/dashboardReport";

export const getDashboardReport = async (): Promise<DashboardReport> => {

  const response = await api.get("/reports/dashboard");

  return response.data;
};