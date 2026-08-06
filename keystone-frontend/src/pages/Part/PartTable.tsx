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
  IconButton,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllParts } from "../../api/partApi";
import type { Part } from "../../types/part";

interface PartTableProps {
  refresh: boolean;
  onEdit: (part: Part) => void;
  onDelete: (part: Part) => void;
}

function PartTable({
  refresh,
  onEdit,
  onDelete,
}: PartTableProps) {

  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadParts();
  }, [refresh]);

  const loadParts = async () => {
    try {

      setLoading(true);

      const data = await getAllParts();

      setParts(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredParts = useMemo(() => {

    const keyword = search.toLowerCase();

    return parts.filter((part) =>
      part.partName.toLowerCase().includes(keyword) ||
      part.partCode.toLowerCase().includes(keyword)
    );

  }, [parts, search]);

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
            fontWeight={700}
          >
            Parts Inventory
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Parts: {filteredParts.length}
          </Typography>

        </Box>

        <TextField
          size="small"
          placeholder="Search parts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ width: 320 }}
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
              <TableCell><b>Part Name</b></TableCell>
              <TableCell><b>Part Code</b></TableCell>
              <TableCell><b>Unit Price</b></TableCell>
              <TableCell><b>Stock</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {filteredParts.length === 0 ? (

              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No parts found.
                </TableCell>
              </TableRow>

            ) : (

              filteredParts.map((part) => (

                <TableRow
                  key={part.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell>{part.id}</TableCell>
                  <TableCell>{part.partName}</TableCell>
                  <TableCell>{part.partCode}</TableCell>
                  <TableCell>₹ {part.unitPrice}</TableCell>
                  <TableCell>{part.stockQuantity}</TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(part)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(part)}
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

export default PartTable;