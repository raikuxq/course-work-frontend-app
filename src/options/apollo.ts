import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core';
import jwtDecode from 'jwt-decode';
import {GRAPHQL_API_ENDPOINT_URL, LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from './constants';
import {setContext} from "@apollo/client/link/context";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {AUTH_REFRESH_TOKEN_MUTATION} from "@/modules/auth/api/AuthRefreshToken";
import {print} from 'graphql'

interface DecodedToken {
    exp: number;
}

const refreshToken = async (): Promise<string | null> => {
    const authStore = useAuthStore()

    const token = await localStorage.getItem(LS_KEY_ACCESS_TOKEN);

    if (!token) {
        return null;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode(token);

        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

        if (!isTokenExpired) {
            return token;
        }
    } catch (e) {
        console.log(e)
    }




    const refreshToken = await localStorage.getItem(LS_KEY_REFRESH_TOKEN);
    if (!refreshToken) {
        authStore.setUser(null)
        return null;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode(refreshToken);
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

        if (isTokenExpired) {
            authStore.setUser(null)
            return null;
        }
    } catch (e) {
        console.log(e)
    }

    const response = await fetch(GRAPHQL_API_ENDPOINT_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: print(AUTH_REFRESH_TOKEN_MUTATION),
            variables: {
                token: refreshToken,
            },
        }),
    });

    const json = await response.json();
    const newAccessToken = json.data.authRefreshToken.accessToken;
    const newRefreshToken = json.data.authRefreshToken.refreshToken;
    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, newAccessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, newRefreshToken);
    return newAccessToken;
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
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
        mutate: {
            fetchPolicy: 'network-only',
        },
    }
});

export { client };
