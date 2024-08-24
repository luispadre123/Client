import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import {useAuth} from "../context/Auth.Context.tsx";



const CHECK_LOGIN = gql`
    mutation CheckLogin($correo: String!, $password: String!) {
        checkLogin(correo: $correo, password: $password) {
            token
            usuario {
                id
                username
                correo
                nombreCompleto
            }
        }
    }
`;


const Login: React.FC = ({children}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { updateData } = useAuth();

    const [checkLogin, { data, loading, error }] = useMutation(CHECK_LOGIN);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;

        if (form) {
            const formData = new FormData(form);
            const correo = formData.get('correo') as string;
            const password = formData.get('password') as string;

            try {
                const response = await checkLogin({
                    variables: { correo, password },
                });

                if (response.data?.checkLogin?.token) {
                    updateData({ token: response.data.checkLogin.token });
                }

                console.log('Login successful:', response.data);
            } catch (err) {
                console.error('Error iniciando sesión:', err);
            }
        }
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: 450 }}>
                <h2 className="ui teal image header">
                    <div className="content">
                        Iniciar Sesión
                    </div>
                </h2>
                <form className="ui large form" onSubmit={handleSubmit} ref={formRef}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input
                                    type="email"
                                    name="correo"
                                    value="luis@gmail.com"
                                    placeholder="Correo electrónico"
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input
                                    type="password"
                                    name="password"
                                    value="123"
                                    value="123"
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>
                        </div>
                        <button className="ui fluid large teal submit button" type="submit" disabled={loading}>
                            {loading ? 'Iniciando sesión...' : 'Login'}
                        </button>
                    </div>

                    {error && <div className="ui error message">Error: {error.message}</div>}

                    {children}
                </form>
            </div>
        </div>
    );
};

export default Login;
