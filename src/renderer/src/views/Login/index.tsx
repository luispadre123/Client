import { useState } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { Container, GlobalStyle, Overlay } from "./styles";
import { useMutation } from "@apollo/client";
import { CHECK_LOGIN, CREATE_USUARIO } from "../../services/user-service";
import { useAuth } from "../../context/Auth.Context";

const LoginJAPG = ({ toggleForm, isRegister }: any) => {
  const [createUsuario, { dataRegister, loadingRegister, errorRegister }] = useMutation(CREATE_USUARIO);
  const [checkLogin, { dataLogin, loadingLoading, errorLogin }] = useMutation(CHECK_LOGIN);
  const { updateData } = useAuth();

  // const [isRegister, setIsRegister] = useState(true);

  const [formData, setFormData] = useState({
    correo: "",
    id: "",
    nombreCompleto: "",
    password: "",
    salt: 10,
    username: "",
    numeroTelefono: "",
  });
  const updateField = (field: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (isRegister) {
        const { data } = await createUsuario({
          variables: {
            username: formData.username,
            password: formData.password,
            salt: formData.salt,
            correo: formData.correo,
            nombreCompleto: formData.nombreCompleto,
            numeroTelefono: formData.numeroTelefono,
          },
        });
        console.log("Usuario creado:", data.createUsuario);
      } else {
        debugger
        const { data } = await checkLogin({
          variables: { correo: formData.correo, password: formData.password },
        });

        if (data?.checkLogin?.token) {
          updateData({ token: data.checkLogin.token });
      }


        console.log("usuario inicio sesión:", data.checkLogin);
      }
    } catch (error) {
      console.error("Error usuario:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Overlay />
      <Container>
        <Header isRegister={isRegister} />
        <Body
          isRegister={isRegister}
          formData={formData}
          updateField={updateField}
          onSubmit={handleSubmit}
        />
        <Footer
          toggleForm={toggleForm}
          isRegister={isRegister}
          formData={formData}
          updateField={updateField}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default LoginJAPG;
