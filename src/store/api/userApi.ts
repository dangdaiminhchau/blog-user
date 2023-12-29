import { IUpdateFormat, IUpdatePassword } from './../type/user.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../type/user.type';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: build => ({
        getUser: build.query({
            query: () => ({
                url: '/User',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        updateUser: build.mutation<IUser, IUpdateFormat>({
            query: body => ({
                url: '/User',
                method: 'PUT',
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        updatePassword: build.mutation<void, IUpdatePassword>({
            query: body => ({
                url: '/auth/changePassword',
                method: 'PUT',
                body: body,
            }),
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } = userApi;
