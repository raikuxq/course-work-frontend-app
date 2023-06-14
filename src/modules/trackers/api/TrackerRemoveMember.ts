import { gql } from 'graphql-tag';

export const TRACKER_REMOVE_MEMBER_MUTATION = gql`
    mutation trackerRemoveMember(
        $trackerId: String!,
        $userId: String!
    ) {
        trackerRemoveMember(data: {trackerId: $trackerId, userId: $userId}) {
            id
        }
    }
`;
