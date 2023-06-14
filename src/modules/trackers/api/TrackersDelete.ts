import { gql } from 'graphql-tag';

export const TRACKER_DELETE_MUTATION = gql`
    mutation trackerDelete($id: String!) {
        trackerDelete(id: $id)
    }
`;
