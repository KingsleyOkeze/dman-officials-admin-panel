import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/auth-pages-styles/SignUpVerification.css';
import { useNavigate, useParams } from 'react-router-dom';

function SignUpVerification () {
    const { token } = useParams(); // Use destructuring to extract the token
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for spinner

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.post(`/admin/verify-sign-up-email/${token}`);
                setMessage(response.data.message);
                setIsSuccess(true);
                navigate('/admin/login');
            } catch (error) {
                setMessage(error.response?.data?.error || 'Verification failed.');
                setIsSuccess(false);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="verification-page">
            <h1>Email Verification</h1>
            {loading ? (
                <div className="spinner"></div> // Show spinner while loading
            ) : (
                <p className={isSuccess ? 'success' : 'error'}>{message}</p>
            )}
        </div>
    );
    
}

export default SignUpVerification;

