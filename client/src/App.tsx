import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import CreateProject from "./pages/CreateProject";
import PrivateRoute, { PublicRoute } from "./utils/ProtectesRoutes";

export default function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="/project-list" element={<ProjectList />} />
              <Route path="/create-project" element={<CreateProject />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}