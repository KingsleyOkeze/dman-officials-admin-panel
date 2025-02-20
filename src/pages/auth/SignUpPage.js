import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/auth-pages-styles/SignUpPage.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
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
    const [value, setValue] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true); 

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        console.log(firstName, lastName, email, password)
        try {
            const response = await axios.post('/admin/sign-up', {
                firstName,
                lastName,
                email,
                phone,
                password,
            });
            setMessage(response.data.message);
            console.log(response.data.message)
            // Optionally, redirect to a verification page or login page after signup.
            navigate(`/admin/email-sent/${response.data.userId}`)
        } catch (err) {
            console.log("error signing up", err)
            setError(err.response?.data?.error || 'Sign-up failed.');
        } finally {
            setIsLoading(false); 
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
                    containerStyle={{ width: '100%' }}
                    inputStyle={{ width: '100%' }}
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

                <button type="submit" disabled={isLoading}>
                    {isLoading ? <span className="sign-up-btn-spinner"></span> : 'Sign Up'}
                </button>

            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <p
            className="signup-page-bottom-sign-in-instruction-text"
            >Already have an account? <Link to="/admin/login">Sign in</Link></p>
        </div>
    );
};


export default SignUpPage;
