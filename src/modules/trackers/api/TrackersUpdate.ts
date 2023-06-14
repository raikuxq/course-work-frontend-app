import { gql } from 'graphql-tag';

export const TRACKER_UPDATE_MUTATION = gql`
    mutation trackerUpdate(
        $id: String!,
        $title: String!,
        $description: String,
        $channelCategoryId: String
    ) {
        trackerUpdate(id: $id, data: {
            title: $title,
            description: $description,
            channelCategoryId: $channelCategoryId
        }) {
            id
            title
        }
    }
`;
