import { gql } from 'graphql-tag'

export const TRACKERS_BY_ID_QUERY = gql`
    query tracker($id: String!) {
        tracker(id: $id) {
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
            description
            createdAt
            reports {
                id
                title
                status
                priority
                type
                updatedAt
                createdAt
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
                    id
                    role
                    user {
                        id
                        firstname
                        lastname
                    }
                }
            }
            channel {
                id
                title
            }
            category {
                id
                title
            }
        }
    }
`;
