import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth";

export const PrivateRoute = () => {
    const {isAuthenticated} = useAuth();
    console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  return (
    <>
        {isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export const PublicRoute = () => {
    const {isAuthenticated} = useAuth();
    console.log('PublicRoute - isAuthenticated:', isAuthenticated);
  return (
    <>
        {!isAuthenticated ? <Outlet /> : <Navigate to="/main" />}
    </>
  )
}

export default {PrivateRoute, PublicRoute}