import { Box, Toolbar } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>

      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
          p: 4,
        }}
      >
        <Toolbar />

        {children}
      </Box>

    </Box>
  );
}

export default MainLayout;