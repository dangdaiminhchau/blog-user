import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories } from '../type/categories.type';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/guest' }),
    endpoints: build => ({
        getCategoriesList: build.query<ICategories[], void>({
            query: () => '/Categories',
        }),
    }),
});

export const { useGetCategoriesListQuery } = categoriesApi;
