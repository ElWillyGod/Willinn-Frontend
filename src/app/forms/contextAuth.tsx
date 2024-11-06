import React, {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface AuthContextProps {
    authEmail: string;
    authToken: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authEmail, setEmail] = useState('');
    const [authToken, setToken] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('authEmail');
        const storedToken = localStorage.getItem('authToken');
        if (storedEmail && storedToken) {
            setEmail(storedEmail);
            setToken(storedToken);
        } else {
            router.push('/');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authEmail, authToken }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};