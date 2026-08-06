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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { getAllPartUsage } from "../../api/partUsageApi";
import type { PartUsage } from "../../types/partUsage";

interface PartUsageTableProps {
  refresh: boolean;
  onDelete: (partUsage: PartUsage) => void;
}

function PartUsageTable({
  refresh,
  onDelete,
}: PartUsageTableProps) {

  const [partUsageList, setPartUsageList] = useState<PartUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartUsage();
  }, [refresh]);

  const loadPartUsage = async () => {
    try {
      setLoading(true);
      const data = await getAllPartUsage();
      setPartUsageList(data);
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
        Part Usage History
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
              <TableCell><b>Work Order</b></TableCell>
              <TableCell><b>Part</b></TableCell>
              <TableCell><b>Quantity Used</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {partUsageList.length === 0 ? (

              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No records found.
                </TableCell>
              </TableRow>

            ) : (

              partUsageList.map((usage) => (

                <TableRow
                  key={usage.id}
                  hover
                >
                  <TableCell>{usage.id}</TableCell>
                  <TableCell>{usage.workOrderTitle}</TableCell>
                  <TableCell>{usage.partName}</TableCell>
                  <TableCell>{usage.quantityUsed}</TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="error"
                      onClick={() => onDelete(usage)}
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

export default PartUsageTable;