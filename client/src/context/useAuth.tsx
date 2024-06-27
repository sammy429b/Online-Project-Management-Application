import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
    token: string;
    isAuthenticated: boolean;
    handleLoginAuth: () => void;
    handleLogoutAuth: () => void;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props type
interface AuthProviderProps {
    children: ReactNode;
}

// Define the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(() => JSON.parse(localStorage.getItem("isAuthenticated") || 'false'));
    const [token, setToken] = useState<string>(() => localStorage.getItem("token") || '');
    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLoginAuth = () => {
        setAuthenticated(true);
        setToken("sdfsf");
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
    };
    
    const handleLogoutAuth = () => {
        setAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        setToken('');        
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, handleLoginAuth, handleLogoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define and export the useAuth hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};