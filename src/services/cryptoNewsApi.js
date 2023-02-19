import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'crypto-news16.p.rapidapi.com',
    'x-rapidapi-key': '0613a7a012msh2209160f11b4923p16762ajsn2f37f99af5de'
}

const baseUrl = "https://crypto-news16.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ count }) => createRequest(`/news/top/${count}`)
        })
    })

});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;