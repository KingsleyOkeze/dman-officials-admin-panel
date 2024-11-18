// authHelpers.js
import axios from 'axios';

export const handleTokenRefresh = async (retryFunction) => {
  
  try {
    const response = await axios.post('/admin/refresh-token',
      {},
      { withCredentials: true });

    // Save the new access token
    localStorage.setItem('accessToken', response.data.accessToken);
    console.log('new access token from refresh token', response.data.accessToken)
    // Retry the original request function
    await retryFunction();
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle additional logic for failed refresh (e.g., redirect to login)
    localStorage.removeItem('accessToken');
    window.location.href = '/admin/login';
  }
};
