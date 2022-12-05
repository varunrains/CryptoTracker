import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const currencyConvertApiHeaders = {
//     'x-bingapis-sdk': 'true',
//     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//     'x-rapidapi-key': '28cb5760f2msh87faeaaa212e423p164198jsn8e900686afc8'
// }

//const baseUrl = "http://api.exchangeratesapi.io/v1/";
const baseUrl = "https://etherscan.io/token/";
const createRequest = (url) => ({ url});

export const cryptoHoldersApi = createApi({
    reducerPath: 'cryptoHoldersApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNumberOfHolders: builder.query({
            query: (contractAddress) => createRequest(`${contractAddress}#balances`)
        })
    })

});

export const {
    useGetNumberOfHoldersQuery,
} = cryptoHoldersApi;