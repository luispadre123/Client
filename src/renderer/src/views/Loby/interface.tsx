
interface GameData{
  name: string;
    host: string;
    description: string;
    ping: string;
    players: string;
    status: string;
    isPrivate: boolean;
  }
  interface GameListProps<T> {
    data: T[];
    renderRow: (item: T) => React.ReactNode;
  }

  type GameLobbyData = {
    headers: string[];
    games: GameData[];
};

type GameLobbyProps = {
    data: GameLobbyData;
};
  export type{
    GameLobbyProps,
    GameData,GameListProps
  }