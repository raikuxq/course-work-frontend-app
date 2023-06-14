import { gql } from 'graphql-tag';

export const COMMENT_UPDATE_MUTATION = gql`
    mutation commentUpdate(
        $id: String!,
        $content: String!,
    ) {
        commentUpdate(id: $id, data: {
            content: $content,
        }) {
            id
        }
    }
`;
