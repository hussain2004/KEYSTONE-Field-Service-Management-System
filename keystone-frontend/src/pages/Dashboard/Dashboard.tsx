import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard";
import QuickActions from "../../components/QuickActions";
import RecentWorkOrders from "../../components/RecentWorkOrders";
import ActivityTimeline from "../../components/ActivityTimeline";

import {
  getDashboardStats,
  type DashboardResponse,
} from "../../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState<DashboardResponse>({
    customerCount: 0,
    siteCount: 0,
    userCount: 0,
    technicianCount: 0,
    workOrderCount: 0,
    partCount: 0,
    partUsageCount: 0,
    timeLogCount: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();

  const greeting = () => {
    const hour = today.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <MainLayout>
      {/* Premium Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              color: "#1F2937",
            }}
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 18,
              color: "#6B7280",
            }}
          >
            {greeting()}, Hussain 👋
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#9CA3AF",
            }}
          >
            Delivery Service Management System
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#9CA3AF",
            }}
          >
            Today
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "#374151",
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Statistics */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
        }}
      >
        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Customers"
            value={stats.customerCount}
            icon={<GroupsIcon color="primary" fontSize="large" />}
            iconBackground="#E3F2FD"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Sites"
            value={stats.siteCount}
            icon={
              <LocationOnIcon
                sx={{ color: "#2E7D32" }}
                fontSize="large"
              />
            }
            iconBackground="#E8F5E9"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Technicians"
            value={stats.technicianCount}
            icon={
              <EngineeringIcon
                sx={{ color: "#ED6C02" }}
                fontSize="large"
              />
            }
            iconBackground="#FFF3E0"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Work Orders"
            value={stats.workOrderCount}
            icon={
              <AssignmentIcon
                sx={{ color: "#7B1FA2" }}
                fontSize="large"
              />
            }
            iconBackground="#F3E5F5"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Users"
            value={stats.userCount}
            icon={
              <PeopleAltIcon
                color="primary"
                fontSize="large"
              />
            }
            iconBackground="#E8EAF6"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Parts"
            value={stats.partCount}
            icon={
              <Inventory2Icon
                sx={{ color: "#1565C0" }}
                fontSize="large"
              />
            }
            iconBackground="#E3F2FD"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Part Usage"
            value={stats.partUsageCount}
            icon={
              <BuildCircleIcon
                sx={{ color: "#6A1B9A" }}
                fontSize="large"
              />
            }
            iconBackground="#F3E5F5"
          />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard
            title="Time Logs"
            value={stats.timeLogCount}
            icon={
              <AccessTimeIcon
                sx={{ color: "#00897B" }}
                fontSize="large"
              />
            }
            iconBackground="#E0F2F1"
          />
        </Box>
      </Box>

      {/* Quick Actions + Activity */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            flex: "1 1 420px",
          }}
        >
          <QuickActions />
        </Box>

        <Box
          sx={{
            flex: "1 1 420px",
          }}
        >
          <ActivityTimeline />
        </Box>
      </Box>

      {/* Recent Work Orders */}

      <RecentWorkOrders />
    </MainLayout>
  );
}

export default Dashboard;