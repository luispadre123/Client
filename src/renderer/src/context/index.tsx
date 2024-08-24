import React, { ReactNode } from 'react';
import Auth from '../components/Auth';
import { ApolloProvider } from '@apollo/client';
import AuthContextProvider, { useAuth } from './Auth.Context';
import createApolloClient from '../api/apolloClient';
import Home from '../views/Home';



interface ApolloWrapperProps {
    children: ReactNode;
}

const ApolloWrapper = ({ children }: ApolloWrapperProps) => {
    const { data } = useAuth();
    const client = createApolloClient(data.token);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default function App() {
    return (
        <AuthContextProvider>
            <ApolloWrapper>
                <Content />
            </ApolloWrapper>
        </AuthContextProvider>
    );
}

const Content: React.FC = () => {
    const { data } = useAuth();
    console.log(data, 'data');

    return (
        <>
            {data.token && data.token !== "undefined" ? (
                <Home />
            ) : (
                <Auth />
            )}
        </>
    );
};
