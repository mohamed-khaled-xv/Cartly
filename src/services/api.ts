// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: () => ({}), // feature files will inject here
});


