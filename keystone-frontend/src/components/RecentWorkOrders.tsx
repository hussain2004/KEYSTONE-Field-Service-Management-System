import {
  Paper,
  Typography,
  Box,
  Chip,
  Divider,
  Card,
  CardActionArea,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecentWorkOrders } from "../api/dashboardApi";

import type { RecentWorkOrder } from "../types/recentWorkOrder";

function RecentWorkOrders() {
  const navigate = useNavigate();

  const [workOrders, setWorkOrders] = useState<RecentWorkOrder[]>([]);

  useEffect(() => {
    loadRecentWorkOrders();
  }, []);

  const loadRecentWorkOrders = async () => {
    try {
      const data = await getRecentWorkOrders();
      setWorkOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Recent Work Orders
        </Typography>

        <Typography
          sx={{
            color: "#1976D2",
            fontWeight: 600,
            cursor: "pointer",

            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/work-orders")}
        >
          View All
        </Typography>
      </Box>

      {workOrders.map((order, index) => (
        <Card
          key={order.id}
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: 3,
            border: "1px solid #ECEFF1",
            transition: "0.25s",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CardActionArea
            onClick={() => navigate("/work-orders")}
            sx={{
              p: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#F3E5F5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AssignmentIcon
                    sx={{
                      color: "#7B1FA2",
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {order.workOrderCode}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6B7280",
                      mt: 0.5,
                    }}
                  >
                    {order.title}
                  </Typography>
                </Box>
              </Box>

              <ArrowForwardIosIcon
                sx={{
                  color: "#9CA3AF",
                  fontSize: 18,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={order.priority}
                color={
                  order.priority === "HIGH"
                    ? "error"
                    : order.priority === "MEDIUM"
                    ? "warning"
                    : "success"
                }
                size="small"
              />

              <Chip
                label={order.status}
                color={
                  order.status === "COMPLETED"
                    ? "success"
                    : order.status === "OPEN"
                    ? "warning"
                    : "primary"
                }
                size="small"
              />
            </Box>
          </CardActionArea>

          {index !== workOrders.length - 1 && <Divider />}
        </Card>
      ))}
    </Paper>
  );
}

export default RecentWorkOrders;