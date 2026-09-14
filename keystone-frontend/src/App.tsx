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

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <CustomerList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sites"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <SiteList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technicians"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <TechnicianList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/work-orders"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "TECHNICIAN"]}
            >
              <WorkOrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dispatch"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <DispatchPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parts"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "TECHNICIAN"]}
            >
              <PartList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/part-usage"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "TECHNICIAN"]}
            >
              <PartUsageList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/time-logs"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "TECHNICIAN"]}
            >
              <TimeLogList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER"]}
            >
              <KanbanBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technician-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["TECHNICIAN"]}
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