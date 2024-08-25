import PropTypes from 'prop-types';
import { memo, useRef, useMemo, useCallback } from 'react';
import { Container, GlobalStyle, Overlay } from "./styles";
import { useMutation } from "@apollo/client";
import { CHECK_LOGIN, CREATE_USUARIO } from "../../services/user-service";
import { useAuth } from "../../context/Auth.Context";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { Form } from "./Body/styles";

const LoginJAPG = memo(({ toggleForm, isRegister }:any) => {
  const { updateData } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const [createUsuario, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_USUARIO);
  const [checkLogin, { loading: loadingLogin, error: errorLogin }] = useMutation(CHECK_LOGIN);

  const isAddMode = useMemo(() => isRegister, [isRegister]);

  const handleSubmit = useCallback(async (event:any) => {
    event.preventDefault();
    const form = formRef.current;

    if (form) {
      const formData = new FormData(form);
      const formProps = Object.fromEntries(formData);

      try {
        if (isAddMode) {
          const { data } = await createUsuario({
            variables: {
              username: formProps.username,
              password: formProps.password,
              salt: 10,  // Valor por defecto
              correo: formProps.correo,
              nombreCompleto: formProps.nombreCompleto,
              numeroTelefono: formProps.numeroTelefono,
            },
          });
          console.log("Usuario creado:", data.createUsuario);

          // Después de crear el usuario, proceder a iniciar sesión
          const loginResponse = await checkLogin({
            variables: {
              correo: formProps.correo,
              password: formProps.password,
            },
          });

          if (loginResponse.data?.checkLogin?.token) {
            updateData({ token: loginResponse.data.checkLogin.token });
            console.log("Usuario inició sesión:", loginResponse.data.checkLogin);
          }
        } else {
          const { data } = await checkLogin({
            variables: {
              correo: formProps.correo,
              password: formProps.password,
            },
          });

          if (data?.checkLogin?.token) {
            updateData({ token: data.checkLogin.token });
            console.log("Usuario inició sesión:", data.checkLogin);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [isAddMode, createUsuario, checkLogin, updateData]);

  return (
      <>
        <GlobalStyle />
        <Overlay />
        <Container>
          <Header isRegister={isRegister} />
          <Form visible={isRegister} onSubmit={handleSubmit} ref={formRef}>
            <Body isRegister={isRegister} />
            <Footer toggleForm={toggleForm} isRegister={isRegister} />
            {loadingCreate || loadingLogin ? <p>Cargando...</p> : null}
            {errorCreate && <p>Error: {errorCreate.message}</p>}
            {errorLogin && <p>Error: {errorLogin.message}</p>}
          </Form>
        </Container>
      </>
  );
});

LoginJAPG.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

export default LoginJAPG;
