import { gql } from 'graphql-tag'

export const CHANNEL_UPDATE_MUTATION = gql`
    mutation channelUpdate($id: String!, $title: String!, $description: String!) {
        channelUpdate(id: $id, data: {
            title: $title,
            description: $description
        }) {
            id
            createdAt
            updatedAt
            title
            description
            author {
                id
                firstname
            }
        }
    }
`;

