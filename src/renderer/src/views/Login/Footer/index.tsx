import { LoginType } from "../interface"
import {FooterContainer} from './styles'
const Footer =({isRegister,toggleForm }:LoginType)=>{
    return(
        <FooterContainer>
         <p id="toggle-text">
            {isRegister
              ? '¿Ya tienes una cuenta? '
              : '¿No tienes una cuenta? '}
                <a href="#" onClick={toggleForm} id="toggle-form">
                {isRegister ? 'Inicia sesión aquí' : 'Regístrate aquí'}
                </a>
          </p>
        </FooterContainer>
    )
}

export default Footer