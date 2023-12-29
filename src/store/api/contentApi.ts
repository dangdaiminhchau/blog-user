import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContent, IContentBody, IFormatCateUpdate, IFormatUpdate } from '../type/content.type';
import { ICategories } from '../type/categories.type';

export const contentPublicApi = createApi({
    reducerPath: 'contentPublicApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: build => ({
        getContentTopDate: build.query<IContent[], void>({
            query: () => '/guest/Content/TopDate',
        }),
        getContentTopView: build.query<IContent[], void>({
            query: () => '/guest/Content/TopViews',
        }),
        getContentInCates: build.query<ICategories, number>({
            query: categoryId => `/guest/Category?categoryId=${categoryId}`,
        }),
        getAllContent: build.query<IContent[], void>({
            query: () => '/guest/Content/All',
        }),
        getContent: build.query<IContent, number>({
            query: id => `/guest/Content?id=${id}`,
        }),
        getSearch: build.query<any, any>({
            query: search => `/guest/Content/Search?search=${search}`,
        }),
    }),
});

export const contentPrivateApi = createApi({
    reducerPath: 'contentPrivateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api',
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                return headers;
            }
        },
    }),

    endpoints: build => ({
        addContent: build.mutation<IContent, IContentBody>({
            query(body) {
                return {
                    url: '/Content',
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        getContentOfUser: build.query<IContent[], void>({
            query() {
                return {
                    url: '/Content',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        deleteContent: build.mutation<IContent, number>({
            query(id) {
                return {
                    url: `/Content?id=${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        updateCateContent: build.mutation<IContent, IFormatCateUpdate>({
            query(body) {
                return {
                    url: '/Content/Categories',
                    method: 'PUT',
                    body: body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        updateContent: build.mutation<IContent, IFormatUpdate>({
            query(body) {
                return {
                    url: '/Content',
                    method: 'PUT',
                    body: body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const {
    useGetContentTopDateQuery,
    useGetContentTopViewQuery,
    useGetContentInCatesQuery,
    useGetAllContentQuery,
    useGetContentQuery,
    useGetSearchQuery,
} = contentPublicApi;
export const {
    useAddContentMutation,
    useGetContentOfUserQuery,
    useDeleteContentMutation,
    useUpdateCateContentMutation,
    useUpdateContentMutation,
} = contentPrivateApi;
