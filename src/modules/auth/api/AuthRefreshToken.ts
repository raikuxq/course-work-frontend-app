import {gql} from "graphql-tag";

export const AUTH_REFRESH_TOKEN_MUTATION = gql`
    mutation authRefreshToken($token: JWT!) {
        authRefreshToken(token: $token) {
            accessToken
            refreshToken
        }
    }
`;
