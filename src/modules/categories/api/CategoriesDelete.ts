import { gql } from 'graphql-tag'

export const CATEGORY_DELETE_MUTATION = gql`
    mutation channelCategoryDelete($id: String!) {
        channelCategoryDelete(id: $id)
    }
`;
