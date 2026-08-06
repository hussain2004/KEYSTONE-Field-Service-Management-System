import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";

import KanbanColumn from "./KanbanColumn";

import { getAllWorkOrders } from "../../api/workOrderApi";

import type { WorkOrder } from "../../types/workOrder";

function KanbanBoard() {

  const [loading, setLoading] = useState(true);

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    loadWorkOrders();
  }, []);

  const loadWorkOrders = async () => {

    try {

      setLoading(true);

      const data = await getAllWorkOrders();

      setWorkOrders(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <MainLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );

  }

  const newOrders = workOrders.filter(
    (w) => w.status === "NEW"
  );

  const assignedOrders = workOrders.filter(
    (w) => w.status === "ASSIGNED"
  );

  const inProgressOrders = workOrders.filter(
    (w) => w.status === "IN_PROGRESS"
  );

  const onHoldOrders = workOrders.filter(
    (w) => w.status === "ON_HOLD"
  );

  const completedOrders = workOrders.filter(
    (w) => w.status === "COMPLETED"
  );

  return (
    <MainLayout>

      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          mb: 4,
        }}
      >
        Work Order Board
      </Typography>

      <Grid
        container
        spacing={2}
      >

        <Grid size={{ xs: 12, md: 2.4 }}>
          <KanbanColumn
            title="NEW"
            workOrders={newOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <KanbanColumn
            title="ASSIGNED"
            workOrders={assignedOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <KanbanColumn
            title="IN PROGRESS"
            workOrders={inProgressOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <KanbanColumn
            title="ON HOLD"
            workOrders={onHoldOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <KanbanColumn
            title="COMPLETED"
            workOrders={completedOrders}
          />
        </Grid>

      </Grid>

    </MainLayout>
  );
}

export default KanbanBoard;