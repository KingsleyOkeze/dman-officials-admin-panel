// AuthContext.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
    const [adminId, setAdminId] = useState(sessionStorage.getItem('adminId') || null);

    const handleLogout = async () => {
        
        try {
            const response = await axios.post(
                "/admin/logout",
                {},
                { withCredentials: true } // Include credentials for cookies
            );

            if (response.status === 200) {
                console.log('user logged out')
                sessionStorage.removeItem("adminId");
                sessionStorage.removeItem('accessToken');
                setAdminId(null);
                setAccessToken(null);

                navigate("/admin/login");
            }
      
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const refreshAccessToken = async (retryFunction) => {
        try {
            const response = await axios.post('/admin/refresh-token',
                {},
                { withCredentials: true }
            );

            if (response.status !== 200) {  // Check for non-200 status
                console.error("Refresh token request failed:", response.status, response.data);
                handleLogout(); // Logout immediately on refresh failure
                return null; // Or throw an error
            }

            console.log('Refresh token response:', response.data.accessToken);
            const decoded = jwtDecode( response.data.accessToken);
            sessionStorage.setItem('accessToken', response.data.accessToken); // Store new access token in sessionStorage
            sessionStorage.setItem("adminId", decoded.userId);

            // Update state
            setAccessToken(response.data.accessToken);
            setAdminId(decoded.userId);

            // Retry the original function if provided
            if (retryFunction && typeof retryFunction === 'function') {
                await retryFunction();
            }

            return response.data.accessToken;
            
        } catch (error) {
            console.error("Error refreshing token:", error);
            handleLogout(); // Logout the user if token refresh fails
            return null;
        }
    };


    return (
        <AuthContext.Provider value={{ 
            accessToken,
            adminId,
            setAdminId,
            setAccessToken, 
            handleLogout, 
            refreshAccessToken
          }}
        >
            {children}
        </AuthContext.Provider>
    );
};


