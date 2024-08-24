import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import { Container, GlobalStyle, Overlay } from './styles';
import { useMutation } from '@apollo/client';
import { CREATE_USUARIO } from '../../services/user-service';

const LoginJAPG = ({toggleForm,isRegister}:any) => {
  const [createUsuario, { data, loading, error }] = useMutation(CREATE_USUARIO);

  // const [isRegister, setIsRegister] = useState(true);


  const [formData, setFormData] = useState({
    correo: '',
    id: '',
    nombreCompleto: '',
    password: '',
    salt: 10,
    username: '',
    numeroTelefono: ''
  });
  const updateField = (field: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isRegister) {
      try {
        const { data } = await createUsuario({
          variables: {
            username: formData.username,
            password: formData.password,
            salt: formData.salt,
            correo: formData.correo,
            nombreCompleto: formData.nombreCompleto,
            numeroTelefono: formData.numeroTelefono
          }
        });
        console.log("Usuario creado:", data.createUsuario);
      } catch (error) {
        console.error("Error al crear usuario:", error);
      }
    } else {
      // Aquí iría la lógica para iniciar sesión si es necesario
    }
  };

  return (
    <>
      <GlobalStyle />
      <Overlay />
      <Container>
      <Header isRegister={isRegister}/>
 
      <Body isRegister={isRegister} formData={formData} updateField={updateField} onSubmit={handleSubmit}/>
      <Footer toggleForm={toggleForm} isRegister={isRegister} formData={formData} updateField={updateField} onSubmit={handleSubmit} />
      </Container>
    </>
  );
};

export default LoginJAPG;
