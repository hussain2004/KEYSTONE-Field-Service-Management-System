export interface PartUsage {
  id?: number;

  workOrderId: number;
  workOrderTitle?: string;

  partId: number;
  partName?: string;

  quantityUsed: number;
}