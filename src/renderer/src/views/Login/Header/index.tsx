import { LoginType } from "../interface"
import { HeaderContainer } from "./styles"

const Header =({isRegister}:LoginType)=>{
    return(
        <HeaderContainer>
             <h1>Bienvenido a Tu Plataforma</h1>
          <p id="form-title">
            {isRegister ? 'Regístrate para disfrutar de contenido exclusivo' : 'Inicia sesión para continuar'}
          </p>
        </HeaderContainer>
    )
}

export default Header