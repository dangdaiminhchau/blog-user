import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IReset } from '../type/auth.type';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: builder => ({
        signinUser: builder.mutation({
            query: (body: { username: string; password: string }) => {
                return {
                    url: '/auth/authenticate',
                    method: 'post',
                    body,
                };
            },
        }),
        signupUser: builder.mutation({
            query: (body: { email: string; username: string; password: string; displayName: string }) => {
                return {
                    url: '/auth/register',
                    method: 'post',
                    body,
                };
            },
        }),
        forgotPassword: builder.mutation({
            query: email => {
                return {
                    url: `/auth/ForgotPassword?email=${email}`,
                    method: 'POST',
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (body: IReset) => {
                return {
                    url: '/auth/ResetPassword',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const { useSigninUserMutation, useSignupUserMutation, useForgotPasswordMutation, useResetPasswordMutation } =
    authApi;
