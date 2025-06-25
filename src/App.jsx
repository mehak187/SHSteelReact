import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./Pages/Dashboard";
import Calendar from "./Pages/Calendar";
import Managers from "./Pages/Managers";
import ProjectCoordinators from "./Pages/ProjectCoordinators";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./Pages/Auth/Login";
import CompletedProjects from "./Pages/CompletedProjects";
import DetailProject from "./Pages/DetailProject";

// Import context and route guards
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="/"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/managers" element={<Managers />} />
            <Route path="/projectcoordinators" element={<ProjectCoordinators />} />
            <Route path="/completedproject" element={<CompletedProjects />} />
            <Route path="/detail" element={<DetailProject />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
