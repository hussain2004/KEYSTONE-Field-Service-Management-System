import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import TechnicianForm from "./TechnicianForm";
import type { Technician } from "../../types/technician";

interface TechnicianDialogProps {
  open: boolean;
  technician: Technician;
  onChange: (technician: Technician) => void;
  onSave: () => void;
  onClose: () => void;
}

function TechnicianDialog({
  open,
  technician,
  onChange,
  onSave,
  onClose,
}: TechnicianDialogProps) {

  const isEdit =
    technician.id !== undefined &&
    technician.id !== 0;

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
          {isEdit ? "Edit Technician" : "Add Technician"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update technician information."
            : "Create a new technician profile."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          py: 3,
        }}
      >
        <TechnicianForm
          technician={technician}
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
          {isEdit ? "Update Technician" : "Save Technician"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TechnicianDialog;