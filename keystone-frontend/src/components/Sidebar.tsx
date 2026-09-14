import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const isManager = role === "MANAGER" || role === "ADMIN";
  const isTechnician = role === "TECHNICIAN" || role === "ENGINEER";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton
          component={Link}
          to="/"
          selected={location.pathname === "/"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {isManager && (
          <ListItemButton
            component={Link}
            to="/users"
            selected={location.pathname === "/users"}
          >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/customers"
            selected={location.pathname === "/customers"}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/sites"
            selected={location.pathname === "/sites"}
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Sites" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/technicians"
            selected={location.pathname === "/technicians"}
          >
            <ListItemIcon>
              <EngineeringIcon />
            </ListItemIcon>
            <ListItemText primary="Technicians" />
          </ListItemButton>
        )}

        {(isManager || isTechnician) && (
          <ListItemButton
            component={Link}
            to="/work-orders"
            selected={location.pathname === "/work-orders"}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Work Orders" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/kanban"
            selected={location.pathname === "/kanban"}
          >
            <ListItemIcon>
              <ViewKanbanRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Kanban Board" />
          </ListItemButton>
        )}

        {isTechnician && (
          <ListItemButton
            component={Link}
            to="/technician-dashboard"
            selected={location.pathname === "/technician-dashboard"}
          >
            <ListItemIcon>
              <EngineeringIcon />
            </ListItemIcon>
            <ListItemText primary="Technician Dashboard" />
          </ListItemButton>
        )}

        {(isManager || isTechnician) && (
          <ListItemButton
            component={Link}
            to="/parts"
            selected={location.pathname === "/parts"}
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Parts" />
          </ListItemButton>
        )}

        {(isManager || isTechnician) && (
          <ListItemButton
            component={Link}
            to="/part-usage"
            selected={location.pathname === "/part-usage"}
          >
            <ListItemIcon>
              <BuildCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Part Usage" />
          </ListItemButton>
        )}

        {(isManager || isTechnician) && (
          <ListItemButton
            component={Link}
            to="/time-logs"
            selected={location.pathname === "/time-logs"}
          >
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Time Logs" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/dispatch"
            selected={location.pathname === "/dispatch"}
          >
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Dispatch" />
          </ListItemButton>
        )}

        {isManager && (
          <ListItemButton
            component={Link}
            to="/reports"
            selected={location.pathname === "/reports"}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        )}

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;