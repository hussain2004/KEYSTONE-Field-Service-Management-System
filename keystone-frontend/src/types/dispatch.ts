export interface Dispatch {

  workOrderId: number;

  workOrderCode: string;

  title: string;

  technicianId: number | null;

  technicianName: string | null;

  status: string;

  priority: string;

  scheduledDate: string | null;
}