import { gql } from 'graphql-tag'

export const COMMENTS_BY_ID_QUERY = gql`
    query comment($id: String!) {
        comment(id: $id) {
            id
            createdAt
            updatedAt
            content
            author {
                id
                user {
                    role
                    firstname
                    lastname
                }
            }
            
        }
    }
`;
