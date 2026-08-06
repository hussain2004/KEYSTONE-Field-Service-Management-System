import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import SiteForm from "./SiteForm";

import type { Site } from "../../types/site";
import type { Customer } from "../../types/customer";

interface SiteDialogProps {
  open: boolean;
  site: Site;
  customers: Customer[];
  onChange: (site: Site) => void;
  onSave: () => void;
  onClose: () => void;
}

function SiteDialog({
  open,
  site,
  customers,
  onChange,
  onSave,
  onClose,
}: SiteDialogProps) {

  const isEdit = site.id !== undefined && site.id !== 0;

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
          {isEdit ? "Edit Site" : "Add Site"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update site information."
            : "Create a new customer service location."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          py: 3,
        }}
      >
        <SiteForm
          site={site}
          customers={customers}
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
          {isEdit ? "Update Site" : "Save Site"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SiteDialog;