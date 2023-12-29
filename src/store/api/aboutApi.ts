import { IAbout } from './../type/about.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aboutApi = createApi({
    reducerPath: 'aboutApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: build => ({
        getAboutList: build.query<IAbout[], void>({
            query: () => '/guest/WI/all',
        }),
    }),
});

export const { useGetAboutListQuery } = aboutApi;
