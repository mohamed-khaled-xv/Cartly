import { Api } from './../api';
import {RequestParams} from './models/cart-types';
import type { ProductsResponse } from './models/cart-types';


export const homeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, RequestParams | void>({
      query: (args) => {
        const limit = args?.limit ?? 5;
        const skip = args?.skip ?? 0;
        return `/products?limit=${limit}&skip=${skip}`;
      },
    }),
  }),
});


export const { useGetProductsQuery } = homeApi;
