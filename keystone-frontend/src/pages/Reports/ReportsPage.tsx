import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import { getDashboardReport } from "../../api/reportApi";
import type { DashboardReport } from "../../types/dashboardReport";

function ReportsPage() {

  const [report, setReport] = useState<DashboardReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {

      setLoading(true);

      const data = await getDashboardReport();

      setReport(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    ["Customers", report?.totalCustomers],
    ["Sites", report?.totalSites],
    ["Technicians", report?.totalTechnicians],
    ["Work Orders", report?.totalWorkOrders],
    ["Open", report?.openWorkOrders],
    ["Assigned", report?.assignedWorkOrders],
    ["In Progress", report?.inProgressWorkOrders],
    ["On Hold", report?.onHoldWorkOrders],
    ["Completed", report?.completedWorkOrders],
    ["Closed", report?.closedWorkOrders],
  ];

  return (
    <MainLayout>

      <Typography
        sx={{
          fontSize: 38,
          fontWeight: 700,
          mb: 4,
        }}
      >
        Reports
      </Typography>

      <Grid container spacing={3}>

        {cards.map(([title, value]) => (

          <Grid
            key={title}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6">
                {title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 700,
                  mt: 2,
                }}
              >
                {value}
              </Typography>

            </Paper>
          </Grid>

        ))}

      </Grid>

    </MainLayout>
  );
}

export default ReportsPage;