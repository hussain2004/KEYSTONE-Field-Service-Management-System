import {
  Box,
  Typography,
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import DispatchList from "./DispatchList";

function DispatchPage() {

  return (
    <MainLayout>

      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 38,
            fontWeight: 700,
            color: "#1F2937",
          }}
        >
          Dispatch Management
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280",
            fontSize: 16,
          }}
        >
          View all open work orders waiting for dispatch.
        </Typography>
      </Box>

      <DispatchList />

    </MainLayout>
  );
}

export default DispatchPage;