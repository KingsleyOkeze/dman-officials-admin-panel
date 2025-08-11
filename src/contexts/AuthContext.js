import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext to share login info (like accessToken) across app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    // Store access token and admin ID from session storage
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
    const [adminId, setAdminId] = useState(sessionStorage.getItem('adminId') || null);
    const isRefreshing = useRef(false); // Track if we're refreshing the token
    const failedRequests = useRef([]); // Store failed requests to retry later

    // Log out user: clear session and redirect to login page
    const handleLogout = async () => {
        try {
            await axios.post('/admin/logout', {}, { withCredentials: true });
            console.log('User logged out');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear session and redirect
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('adminId');
            setAccessToken(null);
            setAdminId(null);
            navigate('/admin/login');
        }
    };

    // Set up Axios interceptor to catch 401 errors
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response, // Let successful responses pass through
            async (error) => {
                const originalRequest = error.config;

                // Check for 401 error (expired token) and not a retry
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true; // Mark as retried

                    // If already refreshing, queue the request
                    if (isRefreshing.current) {
                        try {
                            // Wait for new token and retry request
                            const newToken = await new Promise((resolve, reject) => {
                                failedRequests.current.push({ config: originalRequest, resolve, reject });
                            });
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            console.log('Retrying request with new token:', originalRequest.url);
                            return axios(originalRequest);
                        } catch (err) {
                            console.error('Queued request failed:', err.message);
                            return Promise.reject(err);
                        }
                    }

                    isRefreshing.current = true; // Start refresh
                    try {
                        // Try to get new access token
                        const response = await axios.post(
                            '/admin/refresh-token',
                            {},
                            { withCredentials: true }
                        );

                        if (response.status !== 200) {
                            console.error('Refresh failed:', response.status);
                            await handleLogout(); // Log out if refresh fails
                            // Reject all queued requests
                            failedRequests.current.forEach(({ reject }) => reject(new Error('Refresh failed')));
                            failedRequests.current = [];
                            return Promise.reject(error);
                        }

                        // Save new token
                        const newAccessToken = response.data.accessToken;
                        const decoded = jwtDecode(newAccessToken);
                        sessionStorage.setItem('accessToken', newAccessToken);
                        sessionStorage.setItem('adminId', decoded.userId);
                        setAccessToken(newAccessToken);
                        setAdminId(decoded.userId);

                        // Retry all queued requests with new token
                        failedRequests.current.forEach(({ config, resolve }) => {
                            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            resolve(axios(config));
                        });
                        failedRequests.current = [];

                        // Retry the original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        isRefreshing.current = false;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error('Refresh error:', refreshError);
                        if (refreshError.response?.status === 401) {
                            console.log('Refresh token expired or invalid, logging out');
                        }
                        await handleLogout(); // Log out on error
                        // Reject all queued requests
                        failedRequests.current.forEach(({ reject }) => reject(refreshError));
                        failedRequests.current = [];
                        isRefreshing.current = false;
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error); // Pass through other errors
            }
        );

        // Remove interceptor when component unmounts
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                adminId,
                setAccessToken,
                setAdminId,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};