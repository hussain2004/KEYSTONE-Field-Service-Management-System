import { Box, Grid, TextField } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Customer } from "../../types/customer";

interface CustomerFormProps {
  customer: Customer;
  onChange: (customer: Customer) => void;
}

function CustomerForm({
  customer,
  onChange,
}: CustomerFormProps) {

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    onChange({
      ...customer,
      [event.target.name]: event.target.value,
    });

  };

  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Customer Name"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={customer.companyName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Address"
            name="address"
            value={customer.address}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </Box>
  );
}

export default CustomerForm;