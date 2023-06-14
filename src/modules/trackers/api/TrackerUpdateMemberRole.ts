import { gql } from 'graphql-tag';

export const TRACKER_UPDATE_MEMBER_ROLE_MUTATION = gql`
    mutation trackerUpdateMemberRole(
        $trackerId: String!,
        $userId: String!,
        $role: TrackerMemberRole!
    ) {
        trackerUpdateMemberRole(data: {trackerId: $trackerId, userId: $userId, role: $role}) {
            id
        }
    }
`;
