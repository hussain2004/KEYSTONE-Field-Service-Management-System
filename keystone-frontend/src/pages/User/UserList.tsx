import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import UserTable from "./UserTable";
import UserDialog from "./UserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

import {
  createUser,
  updateUser,
  deleteUser,
} from "../../api/userApi";

import type { User } from "../../types/user";

const emptyUser: User = {
  name: "",
  email: "",
  password: "",
  role: "ENGINEER",
  active: true,
};

function UserList() {

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState<User>(emptyUser);

  const handleOpen = () => {
    setUser(emptyUser);
    setOpen(true);
  };

  const handleEdit = (selected: User) => {

    setUser({
      ...selected,
      password: "",
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteClick = (
    selected: User
  ) => {
    setUser(selected);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {

    try {

      await deleteUser(user.id!);

      alert("User deleted successfully.");

      setDeleteOpen(false);
      setRefresh(!refresh);

    } catch (error) {
      console.error(error);
    }

  };

  const handleSave = async () => {

    try {

      if (user.id) {

        await updateUser(user.id, user);

      } else {

        await createUser(user);

      }

      setOpen(false);
      setRefresh(!refresh);

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <MainLayout>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>

          <Typography
            sx={{
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            Users
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
            }}
          >
            Manage application users and roles.
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            px: 3,
            py: 1.3,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add User
        </Button>

      </Box>

      <UserTable
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <UserDialog
        open={open}
        user={user}
        onChange={setUser}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteUserDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />

    </MainLayout>
  );
}

export default UserList;