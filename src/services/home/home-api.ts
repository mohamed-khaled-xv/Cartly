// homeApi.ts
import { Api } from './../api';
import type { ProductsResponse } from './models/cart-types';

// ProductsResponse is the dummyjson shape:
// { products: Product[]; total: number; skip: number; limit: number }

export const homeApi = Api.injectEndpoints({
  endpoints: (build) => ({
    //            Result,       QueryArg (filters), PageParam (offset)
    getProducts: build.infiniteQuery<ProductsResponse, { limit?: number } | void, number>({
      // pageParam = current offset; queryArg = optional filters like limit
      query: ({ pageParam = 0, queryArg }) => {
        const limit = queryArg?.limit ?? 5;
        const skip = pageParam;
        return `/products?limit=${limit}&skip=${skip}`;
      },

      infiniteQueryOptions: {
        initialPageParam: 0,
        // compute next offset from last page
        getNextPageParam: (lastPage) => {
          const next = lastPage.skip + lastPage.limit;
          return next < lastPage.total ? next : undefined; // undefined => no more pages
        },
        // maxPages: 5, // (optional) keep only the last N pages in cache
      },
      // keepUnusedDataFor: 60, // (optional) cache TTL after last subscriber unmounts
    }),
  }),
});

export const { useGetProductsInfiniteQuery } = homeApi;
