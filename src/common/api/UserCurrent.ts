import { gql } from 'graphql-tag'

export const USER_CURRENT = gql`
    query userCurrent {
        userCurrent {
            id
            email
            firstname
            lastname
            role
        }
    }
`;
