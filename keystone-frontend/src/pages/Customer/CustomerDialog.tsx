import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import CustomerForm from "./CustomerForm";
import type { Customer } from "../../types/customer";

interface CustomerDialogProps {
  open: boolean;
  customer: Customer;
  onChange: (customer: Customer) => void;
  onSave: () => void;
  onClose: () => void;
}

function CustomerDialog({
  open,
  customer,
  onChange,
  onSave,
  onClose,
}: CustomerDialogProps) {

  const isEdit = customer.id !== undefined && customer.id !== 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1F2937",
          }}
        >
          {isEdit ? "Edit Customer" : "Add Customer"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update customer information."
            : "Create a new customer for your organization."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          py: 3,
        }}
      >
        <CustomerForm
          customer={customer}
          onChange={onChange}
        />
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
          }}
        >
          {isEdit ? "Update Customer" : "Save Customer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerDialog;