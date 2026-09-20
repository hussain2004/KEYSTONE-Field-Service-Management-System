import {
  Paper,
  Typography,
  Grid,
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import MyWorkOrders from "./MyWorkOrders";

function TechnicianDashboard() {
  return (
    <MainLayout>
      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          mb: 4,
        }}
      >
        Technician Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Today's Summary
            </Typography>

            <Typography mt={2}>
              Assigned Work Orders
            </Typography>

            <Typography
              fontSize={36}
              fontWeight={700}
            >
              --
            </Typography>

            <Typography mt={2}>
              Time Logged Today
            </Typography>

            <Typography
              fontSize={36}
              fontWeight={700}
            >
              --
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <MyWorkOrders />
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default TechnicianDashboard;