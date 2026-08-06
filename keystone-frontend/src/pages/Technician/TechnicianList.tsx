import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import TechnicianTable from "./TechnicianTable";
import TechnicianDialog from "./TechnicianDialog";
import DeleteTechnicianDialog from "./DeleteTechnicianDialog";

import {
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "../../api/technicianApi";

import type { Technician } from "../../types/technician";

const emptyTechnician: Technician = {
  id: 0,
  technicianName: "",
  email: "",
  phoneNumber: "",
  specialization: "",
  active: true,
};

function TechnicianList() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [technician, setTechnician] =
    useState<Technician>(emptyTechnician);

  const handleOpen = () => {
    setTechnician(emptyTechnician);
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleEdit = (
    selectedTechnician: Technician
  ) => {
    setTechnician(selectedTechnician);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (
    selectedTechnician: Technician
  ) => {
    setTechnician(selectedTechnician);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTechnician(technician.id!);

      alert("Technician deleted successfully");

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
        await updateTechnician(
          technician.id!,
          technician
        );
      } else {
        await createTechnician(technician);
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
            Technicians
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            Manage technicians and their specializations.
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
          Add Technician
        </Button>

      </Box>

      <TechnicianTable
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <TechnicianDialog
        open={open}
        technician={technician}
        onChange={setTechnician}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteTechnicianDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />

    </MainLayout>
  );
}

export default TechnicianList;