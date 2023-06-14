import { gql } from 'graphql-tag';

export const COMMENT_CREATE_MUTATION = gql`
    mutation commentCreate(
        $issueReportId: String!,
        $content: String!,
    ) {
        commentCreate(data: {
            content: $content,
            issueReportId: $issueReportId
        }) {
            id
        }
    }
`;
