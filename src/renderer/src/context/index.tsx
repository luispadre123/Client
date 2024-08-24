// App.tsx o App.js
import React from 'react';
import {ApolloProvider} from '@apollo/client';
import AuthContextProvider, {useAuth} from './Auth.Context';
import createApolloClient from '../api/apolloClient';
import Auth from '../components/Auth';
import Home from '../views/Home';
import {WebRTCProvider} from "./WebRTCContext.tsx";
import ManualP2P from "../components/ManualP2P.tsx";

const ApolloWrapper: React.FC = ({children}) => {
    const {data} = useAuth();
    const client = createApolloClient(data.token);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default function App() {
    return (
        <AuthContextProvider>
            <WebRTCProvider>
                <ApolloWrapper>
                    <Content/>
                </ApolloWrapper>
            </WebRTCProvider>
        </AuthContextProvider>
    );
}

const Content: React.FC = () => {
    const {data} = useAuth();
    console.log(data, 'data');

    return (
        <>
            <ManualP2P/>
            {/*{data.token && data.token !== "undefined" ? (*/}
            {/*    <Home/>*/}
            {/*) : (*/}
            {/*    <Auth/>*/}
            {/*)}*/}
        </>
    );
};
