import {
  Paper,
  Typography,
  Box,
  Card,
  CardActionArea,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringIcon from "@mui/icons-material/Engineering";

import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Customer",
      description: "Create and manage customer records",
      icon: <PersonAddIcon sx={{ color: "#1976D2", fontSize: 30 }} />,
      background: "#E3F2FD",
      route: "/customers",
    },
    {
      title: "Add Site",
      description: "Register customer service locations",
      icon: <AddLocationAltIcon sx={{ color: "#2E7D32", fontSize: 30 }} />,
      background: "#E8F5E9",
      route: "/sites",
    },
    {
      title: "Add Technician",
      description: "Manage technician information",
      icon: <EngineeringIcon sx={{ color: "#ED6C02", fontSize: 30 }} />,
      background: "#FFF3E0",
      route: "/technicians",
    },
    {
      title: "Create Work Order",
      description: "Assign work to technicians",
      icon: <AssignmentIcon sx={{ color: "#7B1FA2", fontSize: 30 }} />,
      background: "#F3E5F5",
      route: "/work-orders",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
        p: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Quick Actions
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        {actions.map((action) => (
          <Card
            key={action.title}
            elevation={0}
            sx={{
              border: "1px solid #ECEFF1",
              borderRadius: 3,
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.10)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate(action.route)}
              sx={{
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    backgroundColor: action.background,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {action.icon}
                </Box>

                <ArrowForwardIosIcon
                  sx={{
                    fontSize: 16,
                    color: "#9CA3AF",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  mt: 2,
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                {action.title}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#6B7280",
                  fontSize: 14,
                }}
              >
                {action.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}

export default QuickActions;