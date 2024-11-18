import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Check if the access token exists
  let userRole = ''; 

  if (isAuthenticated) {
    const decodedToken = jwtDecode(isAuthenticated); // Decode the token
    console.log("role is", decodedToken.role)
    userRole = decodedToken.role; // Access the role
  }

  // If not authenticated or not an admin, redirect to login
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  // Render the children (outlet) if authenticated and role is 'admin'
  return <Outlet />;
};

export default ProtectedRoute;
