import React from 'react';
import CustomTitleBar from '../components/CustomTitleBar';
import { gql, useSubscription } from "@apollo/client";
import RoomNotifications from "../components/RoomNotifications.tsx";

// Definición de la suscripción
const ROOMS_SUBSCRIPTION = gql`
    subscription MySubscription {
        roomsListAndUpdates {
            id
            name
            users {
                role
                user {
                    correo
                    id
                    nombreCompleto
                }
            }
            host {
                role
                user {
                    correo
                    id
                    nombreCompleto
                }
            }
        }
    }
`;
const App: React.FC = () => {
    const { data: roomsData, loading: roomsLoading, error: roomsError } = useSubscription(ROOMS_SUBSCRIPTION);

    console.log('roomsData:', roomsData); // Verifica qué datos estás recibiendo

    return (
        <>
            <RoomNotifications/>
            <CustomTitleBar />
            <div className="ui segment">
                <h3>Rooms Updates</h3>
                {roomsLoading && <p>Loading rooms...</p>}
                {roomsError && <p>Error: {roomsError.message}</p>}
                {roomsData && roomsData.roomsListAndUpdates && roomsData.roomsListAndUpdates.length > 0 ? (
                    roomsData.roomsListAndUpdates.map((room: any) => (
                        <div key={room.id}>
                            <h4>{room.name}</h4>
                            <p>Host: {room.host.user.nombreCompleto}</p>
                            <ul>
                                {room.users.map((user: any) => (
                                    <li key={user.user.id}>
                                        {user.user.nombreCompleto} - {user.role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p>
                )}
            </div>
        </>
    );
};


export default App;
