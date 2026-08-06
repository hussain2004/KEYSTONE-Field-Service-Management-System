import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PartTable from "./PartTable";
import PartDialog from "./PartDialog";
import DeletePartDialog from "./DeletePartDialog";

import {
  createPart,
  updatePart,
  deletePart,
} from "../../api/partApi";

import type { Part } from "../../types/part";

const emptyPart: Part = {
  partName: "",
  partCode: "",
  unitPrice: 0,
  stockQuantity: 0,
};

function PartList() {

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [part, setPart] =
    useState<Part>(emptyPart);

  const handleOpen = () => {
    setPart(emptyPart);
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
    selectedPart: Part
  ) => {
    setPart(selectedPart);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (
    selectedPart: Part
  ) => {
    setPart(selectedPart);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {

      await deletePart(part.id!);

      alert("Part deleted successfully");

      setDeleteOpen(false);
      setRefresh(!refresh);

    } catch (error: any) {

      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Delete failed.");
      }

    }
  };

  const handleSave = async () => {

    try {

      if (isEdit) {
        await updatePart(
          part.id!,
          part
        );
      } else {
        await createPart(part);
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
            }}
          >
            Parts
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
            }}
          >
            Manage inventory parts.
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
          Add Part
        </Button>

      </Box>

      <PartTable
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <PartDialog
        open={open}
        part={part}
        onChange={setPart}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeletePartDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />

    </MainLayout>
  );
}

export default PartList;