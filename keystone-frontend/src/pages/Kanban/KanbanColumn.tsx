import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import WorkOrderCard from "./WorkOrderCard";

import type { WorkOrder } from "../../types/workOrder";

interface KanbanColumnProps {
  title: string;
  workOrders: WorkOrder[];
}

function KanbanColumn({
  title,
  workOrders,
}: KanbanColumnProps) {

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
        minHeight: 650,
        backgroundColor: "#F8FAFC",
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={18}
        mb={2}
      >
        {title} ({workOrders.length})
      </Typography>

      <Box>

        {workOrders.length === 0 ? (

          <Typography
            color="text.secondary"
            textAlign="center"
            mt={5}
          >
            No Work Orders
          </Typography>

        ) : (

          workOrders.map((workOrder) => (

            <WorkOrderCard
              key={workOrder.id}
              workOrder={workOrder}
            />

          ))

        )}

      </Box>

    </Paper>
  );
}

export default KanbanColumn;