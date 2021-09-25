import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const currencyConvertApiHeaders = {
//     'x-bingapis-sdk': 'true',
//     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//     'x-rapidapi-key': '28cb5760f2msh87faeaaa212e423p164198jsn8e900686afc8'
// }

//const baseUrl = "http://api.exchangeratesapi.io/v1/";
const baseUrl = "https://v6.exchangerate-api.com/v6/";
const createRequest = (url) => ({ url});

export const currencyConvertApi = createApi({
    reducerPath: 'currencyConvertApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getInrFromUsd: builder.query({
            query: () => createRequest(`9b391e7a05e65ab2cb00094b/latest/USD`)
        })
    })

});

export const {
    useGetInrFromUsdQuery,
} = currencyConvertApi;