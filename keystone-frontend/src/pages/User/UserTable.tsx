import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllUsers } from "../../api/userApi";

import type { User } from "../../types/user";

interface UserTableProps {
  refresh: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

function UserTable({
  refresh,
  onEdit,
  onDelete,
}: UserTableProps) {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [refresh]);

  const loadUsers = async () => {

    try {

      setLoading(true);

      const data = await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Users
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow
              sx={{
                backgroundColor: "#F8FAFC",
              }}
            >
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {users.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No users found.
                </TableCell>

              </TableRow>

            ) : (

              users.map((user) => (

                <TableRow
                  key={user.id}
                  hover
                >
                  <TableCell>{user.id}</TableCell>

                  <TableCell>{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell>

                    <Chip
                      label={user.active ? "Active" : "Inactive"}
                      color={user.active ? "success" : "default"}
                      size="small"
                    />

                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(user)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(user)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>
  );
}

export default UserTable;