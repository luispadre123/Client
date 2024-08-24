import React, { useState, createContext, useContext, ReactNode } from 'react';

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

    const updateData = (data: AuthState['data']) => setState({ data });
    const logout = () => setState(initialData);

    return (
        <AuthContext.Provider value={{ ...state, logout, updateData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
