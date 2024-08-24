import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthState {
    data: {
        token: string;
    };
}

interface AuthContextProps extends AuthState {
    logout: () => void;
    updateData: (data: AuthState['data']) => void;
}

const initialData: AuthState = { data: { token: "undefined" } }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialData);

    useEffect(() => {
        const loadStoredToken = async () => {
            const savedToken = await window.api.loadToken();
            if (savedToken) {
                setState({ data: { token: savedToken } });
            }
        };
        loadStoredToken();
    }, []);

    const updateData = async (data: AuthState['data']) => {
        if (window.api && typeof window.api.saveToken === 'function') {
            await window.api.saveToken(data.token);
            setState({ data });
        } else {
            console.error('window.api is not defined or does not have saveToken method');
        }
    };

    const logout = () => {
        window.api.saveToken(""); // Clear the token
        setState(initialData);
    };

    return (
        <AuthContext.Provider value={{ ...state, logout, updateData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
