import { useEffect, useMemo, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllTechnicians } from "../../api/technicianApi";
import type { Technician } from "../../types/technician";

interface TechnicianTableProps {
  refresh: boolean;
  onEdit: (technician: Technician) => void;
  onDelete: (technician: Technician) => void;
}

function TechnicianTable({
  refresh,
  onEdit,
  onDelete,
}: TechnicianTableProps) {

  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTechnicians();
  }, [refresh]);

  const loadTechnicians = async () => {
    try {
      setLoading(true);
      const data = await getAllTechnicians();
      setTechnicians(data);
    } catch (error) {
      console.error("Failed to load technicians", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTechnicians = useMemo(() => {
    const keyword = search.toLowerCase();

    return technicians.filter((technician) =>
      technician.technicianName.toLowerCase().includes(keyword) ||
      technician.email.toLowerCase().includes(keyword) ||
      technician.phoneNumber.includes(keyword) ||
      technician.specialization.toLowerCase().includes(keyword)
    );
  }, [technicians, search]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Technician List
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Technicians: {filteredTechnicians.length}
          </Typography>
        </Box>

        <TextField
          placeholder="Search technicians..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Specialization</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredTechnicians.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No technicians found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTechnicians.map((technician) => (
                <TableRow
                  key={technician.id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell>{technician.id}</TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {technician.technicianName}
                  </TableCell>

                  <TableCell>{technician.email}</TableCell>

                  <TableCell>{technician.phoneNumber}</TableCell>

                  <TableCell>
                    <Chip
                      label={technician.specialization}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={technician.active ? "Active" : "Inactive"}
                      color={technician.active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(technician)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(technician)}
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

export default TechnicianTable;