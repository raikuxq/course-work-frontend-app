import { gql } from 'graphql-tag';

export const REPORTS_DELETE_MUTATION = gql`
    mutation issueReportDelete($id: String!) {
        issueReportDelete(id: $id)
    }
`;
