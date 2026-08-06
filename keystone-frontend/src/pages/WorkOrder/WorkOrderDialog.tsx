import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import WorkOrderForm from "./WorkOrderForm";
import type { WorkOrder } from "../../types/workOrder";

interface WorkOrderDialogProps {
  open: boolean;
  workOrder: WorkOrder;
  onChange: (workOrder: WorkOrder) => void;
  onSave: () => void;
  onClose: () => void;
}

function WorkOrderDialog({
  open,
  workOrder,
  onChange,
  onSave,
  onClose,
}: WorkOrderDialogProps) {

  const isEdit =
    workOrder.id !== undefined &&
    workOrder.id !== 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
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
          {isEdit ? "Edit Work Order" : "Create Work Order"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update work order details and assignment."
            : "Create a new work order and assign it to a technician."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          py: 3,
        }}
      >
        <WorkOrderForm
          workOrder={workOrder}
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
          {isEdit
            ? "Update Work Order"
            : "Save Work Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkOrderDialog;