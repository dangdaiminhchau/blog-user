import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFeedback, IFeedbackBody } from '../type/feedback';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
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
        addFeedback: build.mutation<IFeedback, IFeedbackBody>({
            query(body) {
                return {
                    url: '/Feedback',
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const { useAddFeedbackMutation } = feedbackApi;
