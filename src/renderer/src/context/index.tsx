import AuthContext from './Auth.Context'

// import Home from '../views/Home';
// import Login from '../views/Login';
// import Register from '../views/Register';
// import CustomTitleBar from '../components/CustomTitleBar';
import Auth from '../components/Auth';
import { ApolloProvider } from '@apollo/client';
import client from '../api/apolloClient';

// Detecta la vista basada en el parámetro de búsqueda de la URL
const searchParams = new URLSearchParams(window.location.search);
const view = searchParams.get('view');


export default function () {
    console.log(view,'view')
    return (
        <ApolloProvider client={client}>
        <AuthContext>
            <Auth/>
        </AuthContext>
        </ApolloProvider>
    )
}
