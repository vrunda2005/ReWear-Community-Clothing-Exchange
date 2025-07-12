import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import API from '../services/api';

interface User {
    _id: string;
    name: string;
    email: string;
    points: number;
    isAdmin: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Set up axios interceptor for this token
                    API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                    // Verify token by making a request to get user data
                    const response = await API.get('/auth/me');
                    setUser(response.data.user);
                    setToken(storedToken);
                } catch (error) {
                    // Token is invalid, remove it
                    localStorage.removeItem('token');
                    delete API.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await API.post('/auth/login', { email, password });
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('token', newToken);
            API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            setToken(newToken);
            setUser(userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await API.post('/auth/signup', { name, email, password });
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('token', newToken);
            API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            setToken(newToken);
            setUser(userData);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 