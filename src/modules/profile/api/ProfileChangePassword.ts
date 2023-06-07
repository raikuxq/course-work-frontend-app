import { gql } from 'graphql-tag'

export const PROFILE_CHANGE_PASSWORD_MUTATION = gql`
    mutation userChangePassword($newPassword: String!, $oldPassword: String!) {
        userChangePassword(data: {newPassword: $newPassword, oldPassword: $oldPassword}) {
            id
        }
    }
`;
