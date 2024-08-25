import { LoginType } from "../interface";

const Body = ({ isRegister }: LoginType) => {
    return (
        <>
            {isRegister ? (
                <>
                    <div className="input-container">
                        <label htmlFor="username">Nick Name</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="nombreCompleto">Nombre Completo</label>
                        <input type="text" id="nombreCompleto" name="nombreCompleto" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="numeroTelefono">Número Teléfono</label>
                        <input type="tel" id="numeroTelefono" name="numeroTelefono" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input type="email" id="correo" name="correo" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Regístrate</button>
                </>
            ) : (
                <>
                    <div className="input-container">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input type="email" id="correo" name="correo" required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </>
            )}
        </>
    );
};

export default Body;
