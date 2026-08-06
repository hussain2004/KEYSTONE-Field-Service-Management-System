import { Box, Grid, TextField } from "@mui/material";
import type { ChangeEvent } from "react";
import type { Technician } from "../../types/technician";

interface TechnicianFormProps {
  technician: Technician;
  onChange: (technician: Technician) => void;
}

function TechnicianForm({
  technician,
  onChange,
}: TechnicianFormProps) {

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...technician,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Technician Name"
            name="technicianName"
            value={technician.technicianName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={technician.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={technician.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={technician.specialization}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </Box>
  );
}

export default TechnicianForm;