import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import CustomerTable from "./CustomerTable";
import CustomerDialog from "./CustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../api/customerApi";

import type { Customer } from "../../types/customer";

const emptyCustomer: Customer = {
  id: 0,
  customerName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
  address: "",
  active: true,
};

function CustomerList() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [customer, setCustomer] = useState<Customer>(emptyCustomer);

  const handleOpen = () => {
    setCustomer(emptyCustomer);
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCustomer(customer.id!);

      alert("Customer deleted successfully");

      setDeleteOpen(false);
      setRefresh(!refresh);
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (typeof error.response?.data === "string") {
        alert(error.response.data);
      } else {
        alert("Delete failed.");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateCustomer(customer.id!, customer);
      } else {
        await createCustomer(customer);
      }

      setOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 700,
              color: "#1F2937",
            }}
          >
            Customers
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            Manage customer organizations and contact information.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            px: 3,
            py: 1.3,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 8px 18px rgba(25,118,210,0.25)",

            "&:hover": {
              boxShadow: "0 10px 24px rgba(25,118,210,0.35)",
            },
          }}
        >
          Add Customer
        </Button>
      </Box>

      <CustomerTable
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <CustomerDialog
        open={open}
        customer={customer}
        onChange={setCustomer}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteCustomerDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
}

export default CustomerList;