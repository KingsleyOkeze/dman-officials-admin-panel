import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const PublicRoute = () => {
  const { accessToken } = useContext(AuthContext); // Check for access token

  // If the user is authenticated, redirect to the dashboard
  if (accessToken) {
    return <Navigate to="/admin" />;
  }

  // Otherwise, render the requested component
  return <Outlet />;
};

export default PublicRoute;
