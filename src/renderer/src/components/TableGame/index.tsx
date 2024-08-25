import React from 'react';
import {
    GameListContainer, GameLobbyContainer, LobbyActions,
    LobbyHeader, GameListHeader, GameListRow, GameListCell
} from "./styles";

type Game = {
    name: string;
    host: string;
    description: string;
    ping: string;
    players: string;
    status: string;
    isPrivate: boolean;
};

type GameLobbyData = {
    headers: string[];
    games: Game[];
};

type GameLobbyProps = {
    data: GameLobbyData;
    selectedGameIndex: number | null;
    onGameSelect: (index: number) => void;
};

const TableGame: React.FC<GameLobbyProps> = ({ data,selectedGameIndex,onGameSelect }) => {
    const { headers, games } = data;
    console.log('roomsData:', games); // Verifica qué datos estás recibiendo

    return (
        <>
                <GameListHeader>
                    {headers.map((header, index) => (
                        <div key={index}>{header}</div>
                    ))}
                </GameListHeader>

                {games.map((game, index) => (
                    <GameListRow key={index}
                    onClick={() => onGameSelect(index)}
                    isSelected={selectedGameIndex === index}
                    >
                        <GameListCell>{game.name}</GameListCell>
                        <GameListCell>{game.host}</GameListCell>
                        <GameListCell>{game.description}</GameListCell>
                        <GameListCell>{game.ping}</GameListCell>
                        <GameListCell>{game.players}</GameListCell>
                        <GameListCell className={`status-${game.status.toLowerCase()}`}>{game.status}</GameListCell>
                        <GameListCell className={game.isPrivate ? "private" : "public"}>{game.isPrivate ? "private" : "public"}</GameListCell>
                    </GameListRow>
                ))}
        </>
    );
};

export default TableGame;
