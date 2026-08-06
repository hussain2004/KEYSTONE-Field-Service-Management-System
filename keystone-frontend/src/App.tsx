import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerList from "./pages/Customer/CustomerList";
import SiteList from "./pages/Site/SiteList";
import TechnicianList from "./pages/Technician/TechnicianList";
import WorkOrderList from "./pages/WorkOrder/WorkOrderList";
import DispatchPage from "./pages/Dispatch/DispatchPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import PartList from "./pages/Part/PartList";
import PartUsageList from "./pages/PartUsage/PartUsageList";
import TimeLogList from "./pages/TimeLog/TimeLogList";
import UserList from "./pages/User/UserList";
import KanbanBoard from "./pages/Kanban/KanbanBoard";
import TechnicianDashboard from "./pages/TechnicianDashboard/TechnicianDashboard";
import Login from "./pages/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}

        <Route
  path="/"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "ENGINEER",
      ]}
    >
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/users"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <UserList />
    </ProtectedRoute>
  }
/>

       <Route
  path="/customers"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    >
      <CustomerList />
    </ProtectedRoute>
  }
/>
        <Route
  path="/sites"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    >
      <SiteList />
    </ProtectedRoute>
  }
/>

        <Route
  path="/technicians"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    >
      <TechnicianList />
    </ProtectedRoute>
  }
/>

        <Route
  path="/work-orders"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "ENGINEER",
      ]}
    >
      <WorkOrderList />
    </ProtectedRoute>
  }
/>
        <Route
  path="/dispatch"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    >
      <DispatchPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <ReportsPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/parts"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "ENGINEER",
      ]}
    >
      <PartList />
    </ProtectedRoute>
  }
/>
<Route
  path="/part-usage"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "ENGINEER",
      ]}
    >
      <PartUsageList />
    </ProtectedRoute>
  }
/>
<Route
  path="/time-logs"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
        "ENGINEER",
      ]}
    >
      <TimeLogList />
    </ProtectedRoute>
  }
/>
<Route
  path="/kanban"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ADMIN",
      ]}
    >
      <KanbanBoard />
    </ProtectedRoute>
  }
/>
<Route
  path="/technician-dashboard"
  element={
    <ProtectedRoute
      allowedRoles={[
        "ENGINEER",
      ]}
    >
      <TechnicianDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;