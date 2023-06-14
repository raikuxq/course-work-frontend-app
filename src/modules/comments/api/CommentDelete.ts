import { gql } from 'graphql-tag';

export const COMMENT_DELETE_MUTATION = gql`
    mutation commentDelete(
        $id: String!,
    ) {
        commentDelete(id: $id)
    }
`;
