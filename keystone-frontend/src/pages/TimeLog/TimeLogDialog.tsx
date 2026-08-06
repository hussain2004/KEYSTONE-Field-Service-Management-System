import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import TimeLogForm from "./TimeLogForm";
import type { TimeLog } from "../../types/timeLog";

interface TimeLogDialogProps {
  open: boolean;
  timeLog: TimeLog;
  onChange: (timeLog: TimeLog) => void;
  onSave: () => void;
  onClose: () => void;
}

function TimeLogDialog({
  open,
  timeLog,
  onChange,
  onSave,
  onClose,
}: TimeLogDialogProps) {

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
          Add Time Log
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          Record technician working hours for a work order.
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <TimeLogForm
          timeLog={timeLog}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TimeLogDialog;