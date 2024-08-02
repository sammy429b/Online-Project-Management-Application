import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import ApiConfig from '../utils/ApiConfig';

// Define the shape of the AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    handleLoginAuth: () => void;
    handleLogoutAuth: () => void;
    handleLogout: () => void;
    handleLogoutTokenExpire: () => void;
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
    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLoginAuth = () => {
        setAuthenticated(true);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
    };
    
    const handleLogout = async() =>{
        try {
            const response = await axios.get(ApiConfig.API_LOGOUT_URL,{
                withCredentials:true
            })

            if(response.status === 200){
                handleLogoutAuth();
            }

        } catch (error) {
            console.log("error in logout", error)
        }
    }

    const handleLogoutTokenExpire = () => {
        setAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    }

    const handleLogoutAuth = () => {
        setAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, handleLoginAuth, handleLogoutAuth, handleLogout, handleLogoutTokenExpire }}>
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