import { gql } from 'graphql-tag'

export const ISSUE_REPORT_BY_ID_QUERY = gql`
    query issueReport($id: String!) {
        issueReport(id: $id) {
            id
            title
            type
            status
            priority
            description
            createdAt
            updatedAt
            comments {
                id
                createdAt
                updatedAt
                content
                author {
                    id
                    role
                    user {
                        firstname
                        lastname
                    }
                }
            }
            responsiblePerson {
                id
                role
                user {
                    id
                    firstname
                    lastname
                }
            }
            author {
                role
                id
                user {
                    id
                    firstname
                    lastname
                }
            }
            tracker {
                id
                title
                members {
                    id
                    role
                    user {
                        id
                        firstname
                        lastname
                    }
                }
            }
        }
    }
`;
