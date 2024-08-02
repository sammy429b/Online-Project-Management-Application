import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import CreateProject from "./pages/CreateProject";
import { PrivateRoute, PublicRoute } from "./utils/ProtectesRoutes";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="project-list" element={<ProjectList />} />
            <Route path="create-project" element={<CreateProject />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
