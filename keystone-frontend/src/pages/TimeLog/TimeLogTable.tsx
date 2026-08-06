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

import { getAllTimeLogs } from "../../api/timeLogApi";
import type { TimeLog } from "../../types/timeLog";

interface TimeLogTableProps {
  refresh: boolean;
  onDelete: (timeLog: TimeLog) => void;
}

function TimeLogTable({
  refresh,
  onDelete,
}: TimeLogTableProps) {

  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeLogs();
  }, [refresh]);

  const loadTimeLogs = async () => {
    try {
      setLoading(true);
      const data = await getAllTimeLogs();
      setTimeLogs(data);
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
        Time Log History
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
              <TableCell><b>Technician</b></TableCell>
              <TableCell><b>Start Time</b></TableCell>
              <TableCell><b>End Time</b></TableCell>
              <TableCell><b>Hours</b></TableCell>
              <TableCell><b>Remarks</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {timeLogs.length === 0 ? (

              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  No records found.
                </TableCell>
              </TableRow>

            ) : (

              timeLogs.map((log) => (

                <TableRow
                  key={log.id}
                  hover
                >
                  <TableCell>{log.id}</TableCell>
                  <TableCell>{log.workOrderTitle}</TableCell>
                  <TableCell>{log.technicianName}</TableCell>
                  <TableCell>{log.startTime}</TableCell>
                  <TableCell>{log.endTime}</TableCell>
                  <TableCell>{log.hoursWorked}</TableCell>
                  <TableCell>{log.remarks}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(log)}
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

export default TimeLogTable;