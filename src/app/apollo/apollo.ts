import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core';
import jwtDecode from 'jwt-decode';
import {GRAPHQL_API_ENDPOINT_URL, LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from '@/app/config/constants';
import {setContext} from "@apollo/client/link/context";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {AUTH_REFRESH_TOKEN_MUTATION} from "@/modules/auth/api/AuthRefreshToken";
import {print} from 'graphql'
import type {T_GQL_authRefreshToken_authRefreshToken} from "@/shared/types/graphql";

type TDecodedToken = {
    exp: number;
}

const isTokenExpired = (token: string): boolean => {
    const decodedToken: TDecodedToken = jwtDecode(token);
    return Date.now() >= decodedToken.exp * 1000;
};

const fetchNewTokens = async (refreshToken: string): Promise<T_GQL_authRefreshToken_authRefreshToken | null> => {
    try {
        const response = await fetch(GRAPHQL_API_ENDPOINT_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ query: print(AUTH_REFRESH_TOKEN_MUTATION), variables: { token: refreshToken } }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh tokens');
        }

        const data = await response.json();
        const { accessToken, refreshToken: newRefreshToken } = data?.data?.authRefreshToken || {};

        if (!accessToken || !newRefreshToken) {
            throw new Error('Invalid response from server');
        }

        return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
        console.error(error);
        return null;
    }
};

const refreshToken = async (): Promise<string | null> => {
    const authStore = useAuthStore();
    const token = await localStorage.getItem(LS_KEY_ACCESS_TOKEN);
    const refreshToken = await localStorage.getItem(LS_KEY_REFRESH_TOKEN);

    if (!token || !refreshToken) {
        authStore.setUser(null);
        return null;
    }

    try {
        /**
         * Access token is still valid = use it
         */
        if (!isTokenExpired(token)) {
            return token;
        }

        /**
         * Access token and refresh token are both expired = logout
         */
        if (isTokenExpired(refreshToken)) {
            authStore.setUser(null);
            return null;
        }

        /**
         * Refresh token is valid = fetch new pair and update in storage
         */
        const newTokens = await fetchNewTokens(refreshToken);

        if (newTokens) {
            await localStorage.setItem(LS_KEY_ACCESS_TOKEN, newTokens.accessToken);
            await localStorage.setItem(LS_KEY_REFRESH_TOKEN, newTokens.refreshToken);
            return newTokens.accessToken;
        }
    } catch (error) {
        console.error(error);
    }

    authStore.setUser(null);
    return null;
};


const authLink = setContext(async (operation, { headers }) => {
    const token = await refreshToken();

    return ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    });
});


const httpLink = createHttpLink({
    uri: GRAPHQL_API_ENDPOINT_URL,
});

const link = ApolloLink.from([authLink, httpLink]);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export { client };
