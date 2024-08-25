import styled from 'styled-components';

const GameLobbyContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  background-color: #161B22;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  height: 100vh;
`;

const LobbyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
 
`;
const TitleHeader = styled.h1`
    font-size: 28px;
    color: #58A6FF;
`
const LobbyActions = styled.div`
  
`;
const ButtonActions= styled.button`
    padding: 12px 25px;
    background-color: #238636;
    border: none;
    border-radius: 50px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-right: 10px;
    font-size: 16px;
    position: relative;

    &:hover {
      background-color: #2EA043;
      transform: translateY(-2px);
    }
`

const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  height: 70vh;
  overflow-y: auto;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const GameListHeader = styled.div`
  display: flex;
  background-color: #21262D;
  color: #8B949E;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  
  div {
    flex: 1;
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #30363D;
  }
`;

const GameListRow = styled.div`
  display: flex;
  background-color: #161B22;
  transition: transform 0.2s ease, background-color 0.3s ease;
  cursor: pointer;
  color: #fff;

  /* &:nth-child(even) {
    background-color: #20252B;
  } */

  &:hover {
    background-color: #30363D;
    transform: scale(1.02);
  }
`;

const GameListCell = styled.div`
  flex: 1;
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #30363D;

  &.status-available {
    color: #27C940;
    font-weight: bold;
  }

  &.status-unavailable {
    color: #E23636;
    font-weight: bold;
  }

  &.private {
    color: #FFDD57;
    font-weight: bold;
  }

  &.public {
    color: #8B949E;
  }
`;

export { GameLobbyContainer, LobbyHeader, TitleHeader, LobbyActions, ButtonActions, GameListContainer, GameListHeader, GameListRow, GameListCell };
