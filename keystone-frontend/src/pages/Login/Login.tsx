import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return;
    }

    if (role === "MANAGER") {
      navigate("/", { replace: true });
    } else if (role === "TECHNICIAN") {
      navigate("/technician-dashboard", { replace: true });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);
      localStorage.setItem("role", response.role);

      if (response.role === "MANAGER") {
        navigate("/");
      } else if (response.role === "TECHNICIAN") {
        navigate("/technician-dashboard");
      } else {
        alert("This role does not have a frontend dashboard yet.");

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fa",
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            mb={1}
          >
            KEYSTONE
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
            mb={4}
          >
            Field Service Management
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
            }}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Signing In..." : "Login"}
          </Button>

          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#1976d2",
              cursor: "pointer",
              fontSize: 14,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() =>
              alert(
                "Please contact the system administrator to reset your password."
              )
            }
          >
            Forgot Password?
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;