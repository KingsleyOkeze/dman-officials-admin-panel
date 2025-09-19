import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/auth-pages-styles/SignUpPage.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function SignUpPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // First Name and Last Name
        if (!firstName.trim()) {
            errors.firstName = 'First name is required.';
        }
        if (!lastName.trim()) {
            errors.lastName = 'Last name is required.';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Phone
        if (!phone) {
            errors.phone = 'Phone number is required.';
        } else if (phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digits.';
        }

        // Password
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            errors.password = 'Password must include uppercase, lowercase, and a number.';
        }

        // Confirm Password
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setValidationErrors({});
        setIsLoading(true);

        // Client-side validation
        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('/admin/sign-up', {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone,
                password,
            }, {
                timeout: 10000 // 10 second timeout to prevent infinite spinning
            });

            setMessage(response.data.message);
            navigate(`/admin/email-sent/${response.data.userId}`);
        } catch (err) {
            console.error('Signup error:', err);
            if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
                setError('Request timed out. Please try again.');
            } else if (err.response) {
                setError(err.response.data.error || 'Sign-up failed.');
            } else if (err.request) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <Helmet>
                <title>Sign Up | DMAN Admin Portal</title>
                <meta
                    name="description"
                    content="Create an admin account for the DMAN E-commerce platform to manage products, orders, and more."
                />
            </Helmet>
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
                {validationErrors.firstName && <span className="validation-error">{validationErrors.firstName}</span>}

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {validationErrors.lastName && <span className="validation-error">{validationErrors.lastName}</span>}

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {validationErrors.email && <span className="validation-error">{validationErrors.email}</span>}

                <label htmlFor="phone">Phone Number</label>
                <PhoneInput
                    country={'ng'}
                    value={phone}
                    onChange={setPhone}
                    inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true,
                    }}
                    containerStyle={{ width: '100%', marginBottom: '15px' }}
                    inputStyle={{ width: '100%' }}
                />
                {validationErrors.phone && <span className="validation-error">{validationErrors.phone}</span>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {validationErrors.password && <span className="validation-error">{validationErrors.password}</span>}

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {validationErrors.confirmPassword && <span className="validation-error">{validationErrors.confirmPassword}</span>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? <span className="sign-up-btn-spinner"></span> : 'Sign Up'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <p className="signup-page-bottom-sign-in-instruction-text">
                Already have an account? <Link to="/admin/login">Sign in</Link>
            </p>
        </div>
    );
}

export default SignUpPage;