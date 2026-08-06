import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import UserForm from "./UserForm";
import type { User } from "../../types/user";

interface UserDialogProps {
  open: boolean;
  user: User;
  onChange: (user: User) => void;
  onSave: () => void;
  onClose: () => void;
}

function UserDialog({
  open,
  user,
  onChange,
  onSave,
  onClose,
}: UserDialogProps) {

  const isEdit = !!user.id;

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
          {isEdit ? "Edit User" : "Add User"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          {isEdit
            ? "Update user information and permissions."
            : "Create a new application user."}
        </Typography>
      </Box>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <UserForm
          user={user}
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
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;