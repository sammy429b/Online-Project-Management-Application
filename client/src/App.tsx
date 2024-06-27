import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import CreateProject from "./components/CreateProject";
import PrivateRoute from "./utils/ProtectesRoutes";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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