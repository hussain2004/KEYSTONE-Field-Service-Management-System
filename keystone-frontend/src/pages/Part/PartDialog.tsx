import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import PartForm from "./PartForm";
import type { Part } from "../../types/part";

interface PartDialogProps {
  open: boolean;
  part: Part;
  onChange: (part: Part) => void;
  onSave: () => void;
  onClose: () => void;
}

function PartDialog({
  open,
  part,
  onChange,
  onSave,
  onClose,
}: PartDialogProps) {

  const isEdit =
    part.id !== undefined &&
    part.id !== 0;

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
          {isEdit ? "Edit Part" : "Add Part"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update part information."
            : "Create a new inventory part."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <PartForm
          part={part}
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
          {isEdit ? "Update Part" : "Save Part"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PartDialog;