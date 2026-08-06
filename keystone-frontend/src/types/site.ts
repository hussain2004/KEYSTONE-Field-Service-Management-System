export interface Site {
  id?: number;

  siteName: string;

  address: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  customerId: number;

  customerName?: string;
}