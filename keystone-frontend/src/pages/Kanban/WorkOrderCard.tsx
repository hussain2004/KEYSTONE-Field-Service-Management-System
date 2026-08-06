import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import type { WorkOrder } from "../../types/workOrder";

interface WorkOrderCardProps {
  workOrder: WorkOrder;
}

function WorkOrderCard({
  workOrder,
}: WorkOrderCardProps) {

  const priorityColor = () => {

    switch (workOrder.priority) {

      case "HIGH":
        return "error";

      case "MEDIUM":
        return "warning";

      case "LOW":
        return "success";

      default:
        return "default";
    }

  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>

        <Typography
          fontWeight={700}
          fontSize={16}
        >
          {workOrder.workOrderCode}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {workOrder.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack
          spacing={1}
        >
          <Typography variant="body2">
            <b>Customer:</b> {workOrder.customerName}
          </Typography>

          <Typography variant="body2">
            <b>Site:</b> {workOrder.siteName}
          </Typography>

          <Typography variant="body2">
            <b>Engineer:</b>{" "}
            {workOrder.technicianName ?? "Not Assigned"}
          </Typography>

         <Typography variant="body2">
  <b>Scheduled Date:</b>{" "}
  {new Date(workOrder.scheduledDate).toLocaleDateString()}
</Typography>

        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Chip
            label={workOrder.priority}
            color={priorityColor()}
            size="small"
          />

          <Chip
            label={workOrder.status}
            variant="outlined"
            size="small"
          />

        </Stack>

      </CardContent>
    </Card>
  );
}

export default WorkOrderCard;