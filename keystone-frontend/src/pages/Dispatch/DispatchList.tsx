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
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";

import { getDispatchQueue } from "../../api/dispatchApi";
import type { Dispatch } from "../../types/dispatch";

function DispatchList() {

  const [dispatchQueue, setDispatchQueue] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDispatchQueue();
  }, []);

  const loadDispatchQueue = async () => {
    try {

      setLoading(true);

      const data = await getDispatchQueue();

      setDispatchQueue(data);

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
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Dispatch Queue
      </Typography>

      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Code</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Priority</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Technician</b></TableCell>
              <TableCell><b>Scheduled Date</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {dispatchQueue.map((item) => (

              <TableRow key={item.workOrderId}>

                <TableCell>
                  {item.workOrderCode}
                </TableCell>

                <TableCell>
                  {item.title}
                </TableCell>

                <TableCell>
                  <Chip
                    label={item.priority}
                    color={
                      item.priority === "HIGH"
                        ? "error"
                        : item.priority === "MEDIUM"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {item.status}
                </TableCell>

                <TableCell>
                  {item.technicianName ?? "-"}
                </TableCell>

                <TableCell>
                  {item.scheduledDate ?? "-"}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DispatchList;