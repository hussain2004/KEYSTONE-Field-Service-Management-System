import api from "./axios";
import type { Customer } from "../types/customer";
export interface CustomerPage {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const API_URL = "http://localhost:8080/api/customers";

export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await api.get(API_URL);
  return response.data;
};
export const searchCustomers = async (
  search: string,
  page: number,
  size: number
): Promise<CustomerPage> => {

  const response = await api.get(
    `${API_URL}/search`,
    {
      params: {
        search,
        page,
        size,
      },
    }
  );

  return response.data;
};

export const getCustomerById = async (
  id: number
): Promise<Customer> => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCustomer = async (
  customer: Customer
): Promise<Customer> => {
  const response = await api.post(API_URL, customer);
  return response.data;
};

export const updateCustomer = async (
  id: number,
  customer: Customer
): Promise<Customer> => {
  const response = await api.put(
    `${API_URL}/${id}`,
    customer
  );

  return response.data;
};

export const deleteCustomer = async (
  id: number
): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};