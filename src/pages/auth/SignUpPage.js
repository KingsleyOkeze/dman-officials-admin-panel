import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/auth-pages-styles/SignUpPage.css";
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
console.log(firstName,
    lastName,
    email,
    password,)
        try {
            const response = await axios.post('/admin/sign-up', {
                firstName,
                lastName,
                email,
                password,
            });
            setMessage(response.data.message);
            console.log(response.data.message)
            // Optionally, redirect to a verification page or login page after signup.
            navigate(`/admin/email-sent/${response.data.userId}`)
        } catch (err) {
            console.log("error signing up", err)
            setError(err.response?.data?.error || 'Sign-up failed.');
        }
    };

    return (
        <div className="signup-page">
            <h1>Create an Account</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

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

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SignUpPage;
