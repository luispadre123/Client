import { LoginType } from "../interface";
import { Form } from "./styles";

const Body = ({ isRegister }: LoginType) => {
    return isRegister ? (
        <Form visible={isRegister}>
            <div className="input-container">
                <label htmlFor="name">Nick Name</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className="input-container">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Regístrate</button>
        </Form>
    ) : (
        <Form visible={!isRegister} id="loginForm">
          <div className="input-container">
            <label htmlFor="login-email">Correo Electrónico</label>
            <input type="email" id="login-email" name="login-email" required />
          </div>
          <div className="input-container">
            <label htmlFor="login-password">Contraseña</label>
            <input type="password" id="login-password" name="login-password" required />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </Form>
    );
}

export default Body;
