import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext({
  isAuthenticated: false,
  username: null,
  icon: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    username: null,
    icon: null,
  });

  const navigate = useNavigate();

  // Function to handle login
  // In AuthContext.js
  const login = async (username, password) => {
    // Step 1: Make the API call to login
    try {
        const response = await axios.post('/api/login/checkLogin', {
            loginDetails: { username, password }
        });
        
        const token = response.data.token;

        // Save the token in localStorage
        localStorage.setItem('jwtToken', token);

        // Fetch user profile data
        const userResponse = await axios.get('/api/user/homeProfileData', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (userResponse.status === 200) {
            // Update context with user data
            setAuthState({
                isAuthenticated: true,
                username: userResponse.data.username,
                icon: userResponse.data.icon,
            });
            console.log(`Auth state created. Is authenticated: true, username and icon added.`)
            navigate('/')
        } else {
            console.error('Failed to fetch user data during login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Propagate error to the calling function
    }
  };


  // Function to handle logout
  const logout = () => {
    // Step 1: Remove the JWT token from localStorage
    localStorage.removeItem('jwtToken');

    // Step 2: Reset the auth state
    setAuthState({
      isAuthenticated: false,
      username: null,
      icon: null,
    });

    // Step 3: (Optional) Redirect to login page or home
    // You could use a navigation hook here if needed

    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext in components
export const useAuth = () => {
  return useContext(AuthContext);
};

