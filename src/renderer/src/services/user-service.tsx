import { gql, useMutation } from '@apollo/client';
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


export { CREATE_USUARIO, CHECK_LOGIN };
