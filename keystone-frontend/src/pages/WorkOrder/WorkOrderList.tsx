import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import StatusHistoryDialog from "./StatusHistoryDialog";

import { getStatusHistory } from "../../api/workOrderApi";

import type { StatusHistory } from "../../types/statusHistory";

import MainLayout from "../../layouts/MainLayout";
import WorkOrderTable from "./WorkOrderTable";
import WorkOrderDialog from "./WorkOrderDialog";
import DeleteWorkOrderDialog from "./DeleteWorkOrderDialog";

import {
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} from "../../api/workOrderApi";

import type { WorkOrder } from "../../types/workOrder";

const emptyWorkOrder: WorkOrder = {
  id: 0,
  title: "",
  description: "",
  priority: "",
  status: "",
  scheduledDate: "",
  startTime: "",
  endTime: "",
  customerId: 0,
  siteId: 0,
  technicianId: 0,
  siteName: "",
  technicianName: "",
};

function WorkOrderList() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

const [history, setHistory] = useState<StatusHistory[]>([]);

  const [workOrder, setWorkOrder] =
    useState<WorkOrder>(emptyWorkOrder);

  const handleOpen = () => {
    setWorkOrder(emptyWorkOrder);
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleHistoryClose = () => {
    setHistoryOpen(false);
};

const handleViewHistory = async (
    selectedWorkOrder: WorkOrder
) => {

    try {

        const data = await getStatusHistory(
            selectedWorkOrder.id!
        );

        setHistory(data);

        setHistoryOpen(true);

    } catch (error) {
        console.error(error);
    }
};

  const handleEdit = (
    selectedWorkOrder: WorkOrder
  ) => {
    setWorkOrder(selectedWorkOrder);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (
    selectedWorkOrder: WorkOrder
  ) => {
    setWorkOrder(selectedWorkOrder);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteWorkOrder(workOrder.id!);

      alert("Work Order deleted successfully");

      setDeleteOpen(false);
      setRefresh(!refresh);

    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (typeof error.response?.data === "string") {
        alert(error.response.data);
      } else {
        alert("Delete failed.");
      }
    }
  };

  const handleSave = async () => {
    try {

      if (isEdit) {
        await updateWorkOrder(
          workOrder.id!,
          workOrder
        );
      } else {
        await createWorkOrder(workOrder);
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
              color: "#1F2937",
            }}
          >
            Work Orders
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            Manage delivery service work orders from creation to completion.
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
            boxShadow: "0 8px 18px rgba(25,118,210,0.25)",

            "&:hover": {
              boxShadow: "0 10px 24px rgba(25,118,210,0.35)",
            },
          }}
        >
          Add Work Order
        </Button>

      </Box>

     <WorkOrderTable
    refresh={refresh}
    onEdit={handleEdit}
    onDelete={handleDeleteClick}
    onViewHistory={handleViewHistory}
/>

      <WorkOrderDialog
        open={open}
        workOrder={workOrder}
        onChange={setWorkOrder}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteWorkOrderDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />
      <StatusHistoryDialog
    open={historyOpen}
    history={history}
    onClose={handleHistoryClose}
/>

    </MainLayout>
  );
}

export default WorkOrderList;