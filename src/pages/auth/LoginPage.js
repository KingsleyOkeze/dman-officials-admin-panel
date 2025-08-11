import React, { useContext, useState } from 'react';
import axios from 'axios';
import "../../styles/auth-pages-styles/LoginPage.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function LoginPage () {
    const navigate = useNavigate();
    const { setAccessToken, setAdminId } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/admin/login', { 
                email, 
                password 
            }, 
            { 
                withCredentials: true
            });

            setMessage(response.data.message);
            // Handle successful login, such as redirecting or storing tokens.
            sessionStorage.setItem('accessToken', response.data.accessToken); // Store new access token in sessionStorage
            sessionStorage.setItem("adminId", response.data.userId);
            setAdminId(response.data.userId);
            setAccessToken(response.data.accessToken);
            navigate("/admin");
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    navigate(`/admin/email-sent/${err.response?.data?.userId}`);
                } else {
                    setError(err.response?.data?.error || 'Login failed.');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {
                        loading ? (
                            <span className="spinner"></span>
                        ) 
                        : 
                        <span>Login</span>
                    }
                </button>
                <Link to="/admin/forget-password">Forgot password</Link>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <p 
                className="login-page-bottom-sign-up-instruction-text"
            >
                Don't have an account? <Link to="/admin/sign-up">Sign up</Link>
            </p>
        </div>
    );
}


export default LoginPage;
