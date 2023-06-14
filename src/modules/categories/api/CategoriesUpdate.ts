import { gql } from 'graphql-tag'

export const CATEGORY_UPDATE_MUTATION = gql`
    mutation channelCategoryUpdate($id: String!, $title: String!) {
        channelCategoryUpdate(id: $id, data: {
            title: $title,
        }) {
            id
        }
    }
`;
