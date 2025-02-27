import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming React Router is being used
import axios from 'axios';
import '../../styles/auth-pages-styles/EmailSentPage.css';

function EmailSentPage () {
    const { userId } = useParams(); // Get the user ID from the URL
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResendEmail = async () => {
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`/admin/resend-sign-up-email-verification/${userId}`);
            setMessage(response.data.message || 'Verification email resent successfully!');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to resend verification email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="email-sent-page">
            <h1>Email Sent</h1>
            <p>
                One step left: An email has been sent to your registered email address. Please check your inbox for
                instructions on how to complete your sign-up. If you haven't received the email, you
                can resend it.
            </p>
            <button onClick={handleResendEmail} disabled={loading} className="resend-btn">
                {loading ? (
                    <span className="spinner"></span>
                ) : (
                    <span>Resend Email</span>
                )}
            </button>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
    
}

export default EmailSentPage;
