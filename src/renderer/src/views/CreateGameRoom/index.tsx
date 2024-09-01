import React, { useRef, useState } from 'react';
import { AutocompleteContainer, AutocompleteItem, AutocompleteItems, Button, Container, Form, FormGroup, FormRow, Input, Label, Select, Title } from './styles';

// interface GameRoom {
//     nombre: string;
//     juego: string;
//     host: string;
//     descripcion: string;
//     jugadores: number;
//     estado: string;
//     privado: boolean;
// }

// const CreateGameRoomForm: React.FC = () => {
//     const nombreRef = useRef<HTMLInputElement>(null);
//     const juegoRef = useRef<HTMLInputElement>(null);
//     const hostRef = useRef<HTMLInputElement>(null);
//     const descripcionRef = useRef<HTMLInputElement>(null);
//     const jugadoresRef = useRef<HTMLInputElement>(null);
//     const estadoRef = useRef<HTMLInputElement>(null);
//     const privadoRef = useRef<HTMLInputElement>(null);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         const newGameRoom: GameRoom = {
//             nombre: nombreRef.current?.value || '',
//             juego: juegoRef.current?.value || '',
//             host: hostRef.current?.value || '',
//             descripcion: descripcionRef.current?.value || '',
//             jugadores: parseInt(jugadoresRef.current?.value || '0', 10),
//             estado: estadoRef.current?.value || '',
//             privado: privadoRef.current?.checked || false,
//         };

//         console.log('Game Room Created:', newGameRoom);
//         // Aquí podrías añadir la lógica para añadir este objeto a tu tabla o enviarlo a un backend
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="nombre">Nombre:</label>
//                 <input id="nombre" ref={nombreRef} type="text" required />
//             </div>
//             <div>
//                 <label htmlFor="juego">Juego:</label>
//                 <input id="juego" ref={juegoRef} type="text" required />
//             </div>
//             <div>
//                 <label htmlFor="host">Host:</label>
//                 <input id="host" ref={hostRef} type="text" required />
//             </div>
//             <div>
//                 <label htmlFor="descripcion">Descripción:</label>
//                 <input id="descripcion" ref={descripcionRef} type="text" required />
//             </div>
//             <div>
//                 <label htmlFor="jugadores">Jugadores:</label>
//                 <input id="jugadores" ref={jugadoresRef} type="number" min="1" required />
//             </div>
//             <div>
//                 <label htmlFor="estado">Estado:</label>
//                 <input id="estado" ref={estadoRef} type="text" required />
//             </div>
//             <div>
//                 <label htmlFor="privado">Privado:</label>
//                 <input id="privado" ref={privadoRef} type="checkbox" />
//             </div>
//             <button type="submit">Crear Sala</button>
//         </form>
//     );
// };

// export default CreateGameRoomForm;

const FormularioJuego = () => {
    const [juego, setJuego] = useState('');
    const [filteredJuegos, setFilteredJuegos] = useState([]);
    const [autocompleteActive, setAutocompleteActive] = useState(false);
  
    const juegos = ['FIFA 23', 'Minecraft', 'Fortnite', 'Call of Duty', 'Among Us'];
  
    const handleJuegoChange = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setJuego(e.target.value);
  
      if (searchTerm.length > 0) {
        const filtered = juegos.filter((juego) =>
          juego.toLowerCase().includes(searchTerm)
        );
        setFilteredJuegos(filtered);
        setAutocompleteActive(filtered.length > 0);
      } else {
        setAutocompleteActive(false);
      }
    };
  
    const handleJuegoSelect = (juego) => {
      setJuego(juego);
      setAutocompleteActive(false);
    };
  
    const handleClickOutside = (e) => {
      if (!e.target.closest('.autocomplete-container')) {
        setAutocompleteActive(false);
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    return (
      <Container>
        <Title>Crear Nuevo Juego</Title>
        <Form id="juegoForm">
          <FormRow>
            <FormGroup>
              <Label htmlFor="juego">Juego</Label>
              <AutocompleteContainer className="autocomplete-container">
                <Input
                  type="text"
                  id="juego"
                  name="juego"
                  placeholder="Selecciona un juego"
                  autoComplete="off"
                  value={juego}
                  onChange={handleJuegoChange}
                  required
                />
                <AutocompleteItems active={autocompleteActive}>
                  {filteredJuegos.map((juego, index) => (
                    <AutocompleteItem
                      key={index}
                      onClick={() => handleJuegoSelect(juego)}
                    >
                      {juego}
                    </AutocompleteItem>
                  ))}
                </AutocompleteItems>
              </AutocompleteContainer>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="jugadores">Jugadores</Label>
              <Select id="jugadores" name="jugadores" required>
                <option value="1">1 Jugador</option>
                <option value="2">2 Jugadores</option>
                <option value="3">3 Jugadores</option>
                <option value="X">X Jugadores</option>
              </Select>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                type="text"
                id="descripcion"
                name="descripcion"
                maxLength="50"
                placeholder="Máximo 50 caracteres"
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="privado">Solo amigos</Label>
              <Select id="privado" name="privado" required>
                <option value="sí">Sí</option>
                <option value="no">No</option>
              </Select>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Introduce una contraseña"
                required
              />
            </FormGroup>
          </FormRow>
          <Button    type="submit">Crear Juego</Button>
        </Form>
      </Container>
    );
  };
  
  export default FormularioJuego;
  