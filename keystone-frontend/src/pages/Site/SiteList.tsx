import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";
import SiteTable from "./SiteTable";
import SiteDialog from "./SiteDialog";
import DeleteSiteDialog from "./DeleteSiteDialog";

import {
  createSite,
  updateSite,
  deleteSite,
} from "../../api/siteApi";

import { getAllCustomers } from "../../api/customerApi";

import type { Site } from "../../types/site";
import type { Customer } from "../../types/customer";

const emptySite: Site = {
  id: 0,
  siteName: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  customerId: 0,
  customerName: "",
};

function SiteList() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [site, setSite] = useState<Site>(emptySite);

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to load customers", error);
    }
  };

  const handleOpen = () => {
    setSite(emptySite);
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleEdit = (selectedSite: Site) => {
    setSite(selectedSite);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = (selectedSite: Site) => {
    setSite(selectedSite);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSite(site.id!);

      alert("Site deleted successfully");

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
        await updateSite(site.id!, site);
      } else {
        await createSite(site);
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
            Sites
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            Manage customer sites and service locations.
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
          Add Site
        </Button>
      </Box>

      <SiteTable
        refresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <SiteDialog
        open={open}
        site={site}
        customers={customers}
        onChange={setSite}
        onSave={handleSave}
        onClose={handleClose}
      />

      <DeleteSiteDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
}

export default SiteList;