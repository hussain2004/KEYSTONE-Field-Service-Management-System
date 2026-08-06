export interface TimeLog {
  id?: number;

  workOrderId: number;
  workOrderTitle?: string;

  technicianId: number;
  technicianName?: string;

  startTime: string;

  endTime: string;

  hoursWorked: number;

  remarks: string;
}