import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi'
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { currencyConvertApi } from '../services/currencyConvertApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [currencyConvertApi.reducerPath]: currencyConvertApi.reducer
    },

});