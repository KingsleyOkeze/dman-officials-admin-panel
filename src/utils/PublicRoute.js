import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Check for access token

  // If the user is authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  // Otherwise, render the requested component
  return <Outlet />;
};

export default PublicRoute;
