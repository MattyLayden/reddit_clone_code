import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/userContext';

import '../css/loginform.css'

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(username, password);
            console.log('Login successful, added to AuthContext');
        } catch (error) {
            console.log('Login failed:', error);
            setErrorMessage('Login failed. Please check your username and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" /> 
                ) : (
                    'Log in'
                )}
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
}
