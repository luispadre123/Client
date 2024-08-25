import { gql } from "@apollo/client";

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

export {
    ROOMS_SUBSCRIPTION
}