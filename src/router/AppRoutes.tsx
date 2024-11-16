import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import TeamPage from "../pages/TeamPage/TeamPage";
import TasksPage from "../pages/TasksPage/TasksPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
