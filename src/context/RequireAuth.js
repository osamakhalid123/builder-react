import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogged = localStorage.getItem("uid");

  if (!isLogged) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};
