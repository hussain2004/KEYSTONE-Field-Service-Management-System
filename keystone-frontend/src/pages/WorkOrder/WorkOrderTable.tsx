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
  Chip,
  TextField,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  getAllWorkOrders,
  startWork,
  holdWork,
  resumeWork,
  completeWork,
  closeWork,
} from "../../api/workOrderApi";
import type { WorkOrder } from "../../types/workOrder";

interface WorkOrderTableProps {
  refresh: boolean;
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (workOrder: WorkOrder) => void;
  onViewHistory: (workOrder: WorkOrder) => void;
}

function WorkOrderTable({
  refresh,
  onEdit,
  onDelete,
  onViewHistory,
}: WorkOrderTableProps) {

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadWorkOrders();
  }, [refresh]);

  const loadWorkOrders = async () => {
    try {
      setLoading(true);

      const data = await getAllWorkOrders();

      setWorkOrders(data);
    } catch (error) {
      console.error("Failed to load work orders", error);
    } finally {
      setLoading(false);
    }
  };
  const handleWorkflowAction = async (
  action: () => Promise<any>
) => {
  try {
    await action();
    loadWorkOrders();
  } catch (error) {
    console.error(error);
    alert("Operation failed.");
  }
};

  const filteredWorkOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return workOrders.filter((workOrder) =>
      workOrder.title.toLowerCase().includes(keyword) ||
      workOrder.siteName?.toLowerCase().includes(keyword) ||
      workOrder.technicianName?.toLowerCase().includes(keyword) ||
      workOrder.priority.toLowerCase().includes(keyword) ||
      workOrder.status.toLowerCase().includes(keyword)
    );
  }, [workOrders, search]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "error";
      case "MEDIUM":
        return "warning";
      default:
        return "success";
    }
  };

  const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "primary";

    case "ASSIGNED":
      return "info";

    case "IN_PROGRESS":
      return "warning";

    case "ON_HOLD":
      return "secondary";

    case "COMPLETED":
      return "success";

    case "CLOSED":
      return "default";

    default:
      return "default";
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
            Work Order List
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Work Orders: {filteredWorkOrders.length}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search work orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 320,
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
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Priority</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Site</b></TableCell>
              <TableCell><b>Technician</b></TableCell>
              <TableCell><b>SLA</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredWorkOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No work orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkOrders.map((workOrder) => (
                <TableRow
                  key={workOrder.id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell>{workOrder.id}</TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {workOrder.title}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={workOrder.priority}
                      color={getPriorityColor(workOrder.priority)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={workOrder.status.replace("_", " ")}
                      color={getStatusColor(workOrder.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {workOrder.siteName}
                  </TableCell>

                  <TableCell>
                    {workOrder.technicianName || "-"}
                  </TableCell>
                  <TableCell>
  <Chip
    label={
      workOrder.slaBreached
        ? "Breached"
        : "On Time"
    }
    color={
      workOrder.slaBreached
        ? "error"
        : "success"
    }
    size="small"
  />
</TableCell>

                 <TableCell align="center">

  <Stack
    direction="row"
    spacing={1}
    justifyContent="center"
    flexWrap="wrap"
  >

    <IconButton
      color="primary"
      onClick={() => onEdit(workOrder)}
    >
      <EditIcon />
    </IconButton>

    <IconButton
      color="error"
      onClick={() => onDelete(workOrder)}
    >
      <DeleteIcon />
    </IconButton>
    <IconButton
  color="info"
  onClick={() => onViewHistory(workOrder)}
>
  <VisibilityIcon />
</IconButton>

    {workOrder.status === "ASSIGNED" && (
      <Button
        size="small"
        variant="contained"
        onClick={() =>
          handleWorkflowAction(() =>
            startWork(workOrder.id!)
          )
        }
      >
        Start
      </Button>
    )}

    {workOrder.status === "IN_PROGRESS" && (
      <>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            handleWorkflowAction(() =>
              holdWork(workOrder.id!)
            )
          }
        >
          Hold
        </Button>

        <Button
          size="small"
          color="success"
          variant="contained"
          onClick={() =>
            handleWorkflowAction(() =>
              completeWork(workOrder.id!)
            )
          }
        >
          Complete
        </Button>
      </>
    )}

    {workOrder.status === "ON_HOLD" && (
      <Button
        size="small"
        variant="contained"
        color="warning"
        onClick={() =>
          handleWorkflowAction(() =>
            resumeWork(workOrder.id!)
          )
        }
      >
        Resume
      </Button>
    )}

    {workOrder.status === "COMPLETED" && (
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() =>
          handleWorkflowAction(() =>
            closeWork(workOrder.id!)
          )
        }
      >
        Close
      </Button>
    )}

  </Stack>

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

export default WorkOrderTable;