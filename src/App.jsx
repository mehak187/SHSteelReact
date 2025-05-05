import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./Pages/Dashboard";
import Calendar from "./Pages/Calendar";
import Managers from "./Pages/Managers";
import ProjectCoordinators from "./Pages/ProjectCoordinators";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Calendar />} path="/calendar" />
          <Route element={<Managers />} path="/managers" />
          <Route element={<ProjectCoordinators />} path="/projectcoordinators" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
