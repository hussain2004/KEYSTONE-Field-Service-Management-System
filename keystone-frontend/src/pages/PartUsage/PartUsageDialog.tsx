import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import PartUsageForm from "./PartUsageForm";
import type { PartUsage } from "../../types/partUsage";

interface PartUsageDialogProps {
  open: boolean;
  partUsage: PartUsage;
  onChange: (partUsage: PartUsage) => void;
  onSave: () => void;
  onClose: () => void;
}

function PartUsageDialog({
  open,
  partUsage,
  onChange,
  onSave,
  onClose,
}: PartUsageDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
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
          Add Part Usage
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          Record parts consumed for a work order.
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <PartUsageForm
          partUsage={partUsage}
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

export default PartUsageDialog;