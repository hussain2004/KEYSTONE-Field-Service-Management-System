import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteUserDialog({
  open,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogContent
        sx={{
          textAlign: "center",
          py: 4,
          px: 4,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: "auto",
            mb: 2.5,
            borderRadius: "50%",
            bgcolor: "#FFF3E0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WarningAmberRoundedIcon
            sx={{
              color: "#ED6C02",
              fontSize: 42,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1F2937",
            mb: 1,
          }}
        >
          Delete User
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            lineHeight: 1.7,
          }}
        >
          Are you sure you want to delete this user?
          <br />
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            minWidth: 120,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            minWidth: 120,
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;