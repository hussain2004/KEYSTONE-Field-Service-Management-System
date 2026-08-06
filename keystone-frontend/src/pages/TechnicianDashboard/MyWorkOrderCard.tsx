import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from "@mui/material";

import {
  startWork,
  holdWork,
  resumeWork,
  completeWork,
} from "../../api/workOrderApi";

import type { WorkOrder } from "../../types/workOrder";

interface MyWorkOrderCardProps {
  workOrder: WorkOrder;
  onRefresh: () => void;
}

function MyWorkOrderCard({
  workOrder,
  onRefresh,
}: MyWorkOrderCardProps) {

  const handleAction = async () => {

    try {

      switch (workOrder.status) {

        case "ASSIGNED":
          await startWork(workOrder.id!);
          break;

        case "IN_PROGRESS":
          await holdWork(workOrder.id!);
          break;

        case "ON_HOLD":
          await resumeWork(workOrder.id!);
          break;

        case "RESOLVED":
          await completeWork(workOrder.id!);
          break;

        default:
          return;
      }

      onRefresh();

    } catch (error) {

      console.error(error);

    }

  };

  const getButtonText = () => {

    switch (workOrder.status) {

      case "ASSIGNED":
        return "Start";

      case "IN_PROGRESS":
        return "Hold";

      case "ON_HOLD":
        return "Resume";

      case "RESOLVED":
        return "Complete";

      case "COMPLETED":
        return "Completed";

      case "CLOSED":
        return "Closed";

      default:
        return "";
    }

  };

  const disabled =
    workOrder.status === "COMPLETED" ||
    workOrder.status === "CLOSED";

  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 2,
      }}
    >
      <CardContent>

        <Typography
          fontWeight={700}
          fontSize={18}
        >
          {workOrder.workOrderCode}
        </Typography>

        <Typography
          sx={{ mt: 1 }}
        >
          {workOrder.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>

          <Typography variant="body2">
            <b>Customer:</b>{" "}
            {workOrder.customerName}
          </Typography>

          <Typography variant="body2">
            <b>Site:</b>{" "}
            {workOrder.siteName}
          </Typography>

          <Typography variant="body2">
            <b>Scheduled:</b>{" "}
            {new Date(
              workOrder.scheduledDate
            ).toLocaleDateString()}
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
            color={
              workOrder.priority === "HIGH"
                ? "error"
                : workOrder.priority === "MEDIUM"
                ? "warning"
                : "success"
            }
          />

          <Button
            variant="contained"
            disabled={disabled}
            onClick={handleAction}
          >
            {getButtonText()}
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default MyWorkOrderCard;