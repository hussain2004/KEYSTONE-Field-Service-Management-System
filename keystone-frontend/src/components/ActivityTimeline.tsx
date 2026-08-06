import {
  Paper,
  Typography,
  Box,
  Chip,
  Divider,
  Card,
  CardActionArea,
} from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useEffect, useState } from "react";

import { getTodaysActivity } from "../api/dashboardApi";

import type { Activity } from "../types/activity";

function ActivityTimeline() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getTodaysActivity();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

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
        Today's Activity
      </Typography>

      {activities.map((activity, index) => (
        <Card
          key={activity.workOrderCode}
          elevation={0}
          sx={{
            mb: 2,
            border: "1px solid #ECEFF1",
            borderRadius: 3,
            transition: "0.25s",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CardActionArea
            sx={{
              p: 2,
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
                    backgroundColor: "#E3F2FD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AssignmentTurnedInIcon
                    sx={{
                      color: "#1976D2",
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {activity.workOrderCode}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6B7280",
                      mt: 0.5,
                    }}
                  >
                    {activity.title}
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
                mt: 2,
              }}
            >
              <Chip
                label={activity.status}
                color={
                  activity.status === "COMPLETED"
                    ? "success"
                    : activity.status === "OPEN"
                    ? "warning"
                    : "primary"
                }
                size="small"
              />
            </Box>
          </CardActionArea>

          {index !== activities.length - 1 && <Divider />}
        </Card>
      ))}
    </Paper>
  );
}

export default ActivityTimeline;