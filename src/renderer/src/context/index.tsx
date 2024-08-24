import AuthContext from './Auth.Context'

// import Home from '../views/Home';
// import Login from '../views/Login';
// import Register from '../views/Register';
// import CustomTitleBar from '../components/CustomTitleBar';
import Auth from '../components/Auth';
import { ApolloProvider } from '@apollo/client';
import AuthContextProvider, { useAuth } from './Auth.Context';
import createApolloClient from '../api/apolloClient';
import Auth from '../components/Auth';
import Home from '../views/Home';

const ApolloWrapper: React.FC = ({ children }) => {
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
