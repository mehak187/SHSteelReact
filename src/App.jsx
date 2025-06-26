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
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<Login />} path="/" />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Calendar />} path="/calendar" />
            <Route element={<Managers />} path="/managers" />
            <Route element={<ProjectCoordinators />} path="/projectcoordinators" />
            <Route element={<CompletedProjects />} path="/completedproject" />
            <Route element={<DetailProject />} path="/detail" />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
