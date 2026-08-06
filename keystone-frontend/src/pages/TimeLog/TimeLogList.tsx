import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import TimeLogTable from "./TimeLogTable";
import TimeLogDialog from "./TimeLogDialog";
import DeleteTimeLogDialog from "./DeleteTimeLogDialog";

import {
  createTimeLog,
  deleteTimeLog,
} from "../../api/timeLogApi";

import type { TimeLog } from "../../types/timeLog";

const emptyTimeLog: TimeLog = {
  workOrderId: 0,
  technicianId: 0,
  startTime: "",
  endTime: "",
  hoursWorked: 0,
  remarks: "",
};

function TimeLogList() {

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [timeLog, setTimeLog] =
    useState<TimeLog>(emptyTimeLog);

  const handleOpen = () => {
    setTimeLog(emptyTimeLog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteClick = (
    selected: TimeLog
  ) => {
    setTimeLog(selected);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {

    try {

      await deleteTimeLog(timeLog.id!);

      alert("Time Log deleted successfully.");

      setDeleteOpen(false);
      setRefresh(!refresh);

    } catch (error) {
      console.error(error);
    }

  };

  const handleSave = async () => {

    try {

      await createTimeLog(timeLog);

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
            Time Logs
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
            }}
          >
            Track technician working hours.
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
          Add Time Log
        </Button>

      </Box>

      <TimeLogTable
        refresh={refresh}
        onDelete={handleDeleteClick}
      />

      <TimeLogDialog
        open={open}
        timeLog={timeLog}
        onChange={setTimeLog}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteTimeLogDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />

    </MainLayout>
  );
}

export default TimeLogList;