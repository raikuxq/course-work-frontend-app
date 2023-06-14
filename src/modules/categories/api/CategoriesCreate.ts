import { gql } from 'graphql-tag'

export const CATEGORY_CREATE_MUTATION = gql`
    mutation channelCategoryCreate($title: String!, $channelId: String!) {
        channelCategoryCreate(data: {
            title: $title,
            channelId: $channelId,
        }) {
            id
        }
    }
`;
