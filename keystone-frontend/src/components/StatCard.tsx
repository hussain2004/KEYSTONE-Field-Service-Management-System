import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBackground: string;
}

function StatCard({
  title,
  value,
  icon,
  iconBackground,
}: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        height: 180,
        border: "1px solid #E5E7EB",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(15,23,42,0.15)",
          cursor: "pointer",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "#6B7280",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: iconBackground,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 700,
            mt: 3,
            color: "#111827",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: "auto",
            color: "#9CA3AF",
            fontSize: 14,
          }}
        >
          Total Registered {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;