import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import PartUsageTable from "./PartUsageTable";
import PartUsageDialog from "./PartUsageDialog";
import DeletePartUsageDialog from "./DeletePartUsageDialog";

import {
  createPartUsage,
  deletePartUsage,
} from "../../api/partUsageApi";

import type { PartUsage } from "../../types/partUsage";

const emptyPartUsage: PartUsage = {
  workOrderId: 0,
  partId: 0,
  quantityUsed: 1,
};

function PartUsageList() {

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [partUsage, setPartUsage] =
    useState<PartUsage>(emptyPartUsage);

  const handleOpen = () => {
    setPartUsage(emptyPartUsage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteClick = (
    selected: PartUsage
  ) => {
    setPartUsage(selected);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {

    try {

      await deletePartUsage(partUsage.id!);

      alert("Part usage deleted successfully.");

      setDeleteOpen(false);
      setRefresh(!refresh);

    } catch (error) {
      console.error(error);
    }

  };

  const handleSave = async () => {

    try {

      await createPartUsage(partUsage);

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
            Part Usage
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
            }}
          >
            Track parts consumed in work orders.
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
          Add Part Usage
        </Button>

      </Box>

      <PartUsageTable
        refresh={refresh}
        onDelete={handleDeleteClick}
      />

      <PartUsageDialog
        open={open}
        partUsage={partUsage}
        onChange={setPartUsage}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeletePartUsageDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />

    </MainLayout>
  );
}

export default PartUsageList;