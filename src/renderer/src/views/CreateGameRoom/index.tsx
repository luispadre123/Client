import React, { useRef } from 'react';

interface GameRoom {
    nombre: string;
    juego: string;
    host: string;
    descripcion: string;
    jugadores: number;
    estado: string;
    privado: boolean;
}

const CreateGameRoomForm: React.FC = () => {
    const nombreRef = useRef<HTMLInputElement>(null);
    const juegoRef = useRef<HTMLInputElement>(null);
    const hostRef = useRef<HTMLInputElement>(null);
    const descripcionRef = useRef<HTMLInputElement>(null);
    const jugadoresRef = useRef<HTMLInputElement>(null);
    const estadoRef = useRef<HTMLInputElement>(null);
    const privadoRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newGameRoom: GameRoom = {
            nombre: nombreRef.current?.value || '',
            juego: juegoRef.current?.value || '',
            host: hostRef.current?.value || '',
            descripcion: descripcionRef.current?.value || '',
            jugadores: parseInt(jugadoresRef.current?.value || '0', 10),
            estado: estadoRef.current?.value || '',
            privado: privadoRef.current?.checked || false,
        };

        console.log('Game Room Created:', newGameRoom);
        // Aquí podrías añadir la lógica para añadir este objeto a tu tabla o enviarlo a un backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input id="nombre" ref={nombreRef} type="text" required />
            </div>
            <div>
                <label htmlFor="juego">Juego:</label>
                <input id="juego" ref={juegoRef} type="text" required />
            </div>
            <div>
                <label htmlFor="host">Host:</label>
                <input id="host" ref={hostRef} type="text" required />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <input id="descripcion" ref={descripcionRef} type="text" required />
            </div>
            <div>
                <label htmlFor="jugadores">Jugadores:</label>
                <input id="jugadores" ref={jugadoresRef} type="number" min="1" required />
            </div>
            <div>
                <label htmlFor="estado">Estado:</label>
                <input id="estado" ref={estadoRef} type="text" required />
            </div>
            <div>
                <label htmlFor="privado">Privado:</label>
                <input id="privado" ref={privadoRef} type="checkbox" />
            </div>
            <button type="submit">Crear Sala</button>
        </form>
    );
};

export default CreateGameRoomForm;
