import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Admin credentials - in a real app, these would be securely stored on the backend
const ADMIN_EMAIL = 'admin@fashyear.com';
const ADMIN_PASSWORD = 'adminadmin'; // Specific password for admin account

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [currentUser]);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            // Mock login - in a real app, this would be an API call
            // For demo purposes, we'll just check if the email has an @ symbol
            if (!email.includes('@' , 'gmail' , 'hotmail' , 'outlook' ,'.com' , '.fr' , '.net' , '.org' , '.io' , '.co' , '.in' , '.co.in' , '.co.uk' , '.co.us' , '.co.ca' , '.co.au' , '.co.nz' , '.co.za' , '.co.in' , '.co.uk' , '.co.us' , '.co.ca' , '.co.au' , '.co.nz' , '.co.za' )) {
                throw new Error('Invalid email format');
            }

            // Admin validation - check both email and specific password
            const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL;
            
            // Validate admin password if it's an admin email
            if (isAdminEmail && password !== ADMIN_PASSWORD) {
                throw new Error('Invalid admin credentials');
            }

            // In a real app you would verify credentials with your backend
            // For now, we'll create a mock user
            const user = {
                id: Math.random().toString(36).substring(2),
                email,
                name: email.split('@')[0], // Use part of email as name
                isAdmin: isAdminEmail,
                createdAt: new Date().toISOString(),
            };
            
            // Short timeout to simulate network request
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setCurrentUser(user);
            return user;
        } catch (err) {
            setError(err.message || 'Failed to login');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            // Mock signup - in a real app, this would be an API call
            if (!email.includes('@')) {
                throw new Error('Invalid email format');
            }
            
            // Simulate password strength validation
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            // Admin validation - check if trying to create admin account
            const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL;
            
            // Only allow admin account creation with the specific password
            if (isAdminEmail && password !== ADMIN_PASSWORD) {
                throw new Error('Cannot create admin account with this password');
            }

            // Create a new user object
            const user = {
                id: Math.random().toString(36).substring(2),
                email,
                name: email.split('@')[0],
                isAdmin: isAdminEmail,
                createdAt: new Date().toISOString(),
            };
            
            // Short timeout to simulate network request
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setCurrentUser(user);
            return user;
        } catch (err) {
            setError(err.message || 'Failed to signup');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const updateProfile = (userData) => {
        setCurrentUser(prev => ({
            ...prev,
            ...userData
        }));
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            isAuthenticated: !!currentUser,
            isAdmin: currentUser?.isAdmin || false,
            isLoading,
            error,
            login,
            signup,
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 