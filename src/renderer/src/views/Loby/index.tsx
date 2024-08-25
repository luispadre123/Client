import { useSubscription } from "@apollo/client";
import TableGame from "../../components/TableGame";
import { GameData } from "./interface";
import {
  ButtonActions,
  GameListCell,
  GameListContainer,
  GameListHeader,
  GameListRow,
  GameLobbyContainer,
  LobbyActions,
  LobbyHeader,
  TitleHeader,
} from "./styles";
import { ROOMS_SUBSCRIPTION } from "../../services/room-service";
import { useAuth } from "../../context/Auth.Context";
import { useState } from "react";

const GameLobby = () => {
  const createRoom = () => {

    if (window.api && window.api.createRoom) {
      window.api.createRoom();
    } else {
      console.error("API for creating a room is not available.");
    }
  };

  const joinRoom = () => {
    if (window.api && window.api.joinRoom) {
      window.api.joinRoom();
    } else {
      console.error("API for joining a room is not available.");
    }
  };
  //'Descripción', 'Ping', 'Jugadores', 'Estado', 'Privado'

const { data: roomsData, loading: roomsLoading, error: roomsError } = useSubscription(ROOMS_SUBSCRIPTION);

const mappedGames = roomsData?.roomsListAndUpdates?.map((room: any) => ({
  name: room.name,
  host: room.host.user.nombreCompleto, // Asumiendo que quieres mostrar el nombre completo del host
  description: `Role: ${room.host.role}`, // Puedes ajustar la descripción como desees
  ping: 'N/A', // Si tienes información sobre el ping, puedes agregarla; de lo contrario, deja un valor por defecto
  players: room.users.length, // Cantidad de jugadores en la sala
  status: 'Active'?'available':'unavailable', // Si tienes un campo para el estado, cámbialo por el adecuado
  isPrivate: false, // Dependiendo de los datos, podrías agregar esta lógica
})) || [];

  const data = {
    headers: ['Nombre', 'Host', 'Descripción', 'Ping', 'Jugadores', 'Estado', 'Privado'], // Encabezados de la tabla
    games: mappedGames, 
};

const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);

const handleGameSelect = (index: number) => {
  setSelectedGameIndex(index);
};



  return (
    <GameLobbyContainer>
      <LobbyHeader>
        <TitleHeader>Game Lobby</TitleHeader>
        <LobbyActions>
          <ButtonActions
            onClick={createRoom}
            // data-tooltip="Crear una nueva sala de juego"
          >
            Crear Sala
          </ButtonActions>
          <ButtonActions
            onClick={joinRoom}
            // data-tooltip="Unirse a una sala existente"
          >
            Unirse a Sala
          </ButtonActions>
        </LobbyActions>
      </LobbyHeader>
      <GameListContainer>
        <TableGame data={data}   selectedGameIndex={selectedGameIndex}
                onGameSelect={handleGameSelect}>
        </TableGame>
           </GameListContainer>
           <br />
        <LogoutButton></LogoutButton>

    </GameLobbyContainer>
  );
};


export default GameLobby;

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
      <button onClick={logout} className="ui red button">
          Cerrar Sesión
      </button>
  );
};