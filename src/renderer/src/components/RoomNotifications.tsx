import React, { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';

const ROOM_CREATED_SUBSCRIPTION = gql`
    subscription MySubscription {
        roomCreated {
            name
            id
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

const RoomNotifications: React.FC = () => {
    const { data, error } = useSubscription(ROOM_CREATED_SUBSCRIPTION);

    useEffect(() => {
        if (data && data.roomCreated) {
            const room = data.roomCreated;
            const notificationTitle = `Nueva Sala Creada: ${room.name}`;
            const notificationBody = `Host: ${room.host.user.nombreCompleto}`;

            // Enviar notificación a Electron
            window.api.sendNotification(notificationTitle, notificationBody);
        }

        if (error) {
            console.error("Error en la suscripción:", error);
        }
    }, [data, error]);

    return null; // No necesita renderizar nada
};

export default RoomNotifications;

