import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import MyWorkOrderCard from "./MyWorkOrderCard";

import { getAllWorkOrders } from "../../api/workOrderApi";
import type { WorkOrder } from "../../types/workOrder";

function MyWorkOrders() {
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
      console.error("Failed to load technician work orders:", error);
      setWorkOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography
        fontSize={28}
        fontWeight={700}
        mb={3}
      >
        My Work Orders
      </Typography>

      {workOrders.length === 0 ? (
        <Typography>
          No assigned work orders.
        </Typography>
      ) : (
        workOrders.map((workOrder) => (
          <MyWorkOrderCard
            key={workOrder.id}
            workOrder={workOrder}
            onRefresh={loadWorkOrders}
          />
        ))
      )}
    </Box>
  );
}

export default MyWorkOrders;