import { LoginType } from "../interface";
import { Form } from "./styles";

const Body =  ({ 
    isRegister, 
    toggleForm, 
    formData, 
    updateField, 
    onSubmit 
  }:LoginType) => {
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log('Input Changed:', name, value); // Agrega este log para ver el cambio
 
      if (updateField) {  
        updateField(name, value);
      }
    };

    return isRegister ? (
        <Form visible={isRegister}  onSubmit={(e) => {
            e.preventDefault(); 
            if (onSubmit) {
                onSubmit();
            }
          }}>
           <div className="input-container">
        <label htmlFor="username">Nick Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData?.username || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="nombreCompleto">Nombre Completo</label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombreCompleto"
          value={formData?.nombreCompleto || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="numeroTelefono">numero Telefono</label>
        <input
          type="tel"
          id="numeroTelefono"
          name="numeroTelefono"
          value={formData?.numeroTelefono || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData?.correo || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData?.password || ''}
          onChange={handleInputChange}
          required
        />
      </div>
            <button type="submit">Regístrate</button>
        </Form>
    ) : (
        <Form visible={!isRegister} id="loginForm"  onSubmit={(e) => {
          e.preventDefault(); 
          if (onSubmit) {
              onSubmit();
          }
        }}>
          <div className="input-container">
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData?.correo || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData?.password || ''}
          onChange={handleInputChange}
          required
        />
      </div>
          <button type="submit" >Iniciar Sesión</button>
        </Form>
    );
}

export default Body;
