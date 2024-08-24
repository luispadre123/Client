import React, { useRef } from 'react';
import {  useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_USUARIO = gql`
  mutation CreateUsuario($username: String!, $password: String!, $salt: Int!, $correo: String!, $nombreCompleto: String!, $numeroTelefono: String!) {
    createUsuario(
      username: $username
      password: $password
      salt: $salt
      correo: $correo
      nombreCompleto: $nombreCompleto
      numeroTelefono: $numeroTelefono
    ) {
      id
      username
      correo
      nombreCompleto
    }
  }
`;
const Register: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const [createUsuario, { data, loading, error }] = useMutation(CREATE_USUARIO);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;

        if (form) {
            const formData = new FormData(form);
            const username = formData.get('username') as string;
            const password = formData.get('password') as string;
            const correo = formData.get('correo') as string;
            const nombreCompleto = formData.get('nombreCompleto') as string;
            const numeroTelefono = formData.get('numeroTelefono') as string;

            const salt = Math.floor(Math.random() * 10000); // Generar un salt simple

            try {
                const response = await createUsuario({
                    variables: {
                        input: {
                            username,
                            password,
                            salt,
                            correo,
                            nombreCompleto,
                            numeroTelefono
                        }
                    }
                });

                console.log('Usuario creado:', response.data);
            } catch (err) {
                console.error('Error creando usuario:', err);
            }
        }
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' ,paddingTop:25}}>
            <div className="column" style={{ maxWidth: 450 }}>
                <h2 className="ui teal image header">
                    <div className="content">
                        Registro de Usuario
                    </div>
                </h2>
                <form className="ui large form" onSubmit={handleSubmit} ref={formRef}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Nombre de usuario"
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
                                    placeholder="Contraseña"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="mail icon"></i>
                                <input 
                                    type="email" 
                                    name="correo" 
                                    placeholder="Correo electrónico"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input 
                                    type="text" 
                                    name="nombreCompleto" 
                                    placeholder="Nombre completo"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="phone icon"></i>
                                <input 
                                    type="tel" 
                                    name="numeroTelefono" 
                                    placeholder="Número de teléfono"
                                    required 
                                />
                            </div>
                        </div>
                        <button className="ui fluid large teal submit button" type="submit" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>

                    {error && <div className="ui error message">Error: {error.message}</div>}

                    <div className="ui message">
                        ¿Ya tienes una cuenta? <a href="#">Inicia Sesión</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
