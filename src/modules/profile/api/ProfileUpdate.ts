import { gql } from 'graphql-tag'

export const PROFILE_UPDATE_MUTATION = gql`
    mutation userUpdate($firstname: String!, $lastname: String!) {
        userUpdate(data: {lastname: $lastname, firstname: $firstname}) {
            id
            firstname
            lastname
            email
            role
        }
    }
`;
