import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

const drawerWidth = 240;

function Header() {

  const username = localStorage.getItem("username") || "User";

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 2,
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Project KEYSTONE
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            {username}
          </Typography>

          <Avatar sx={{ bgcolor: "primary.dark" }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;