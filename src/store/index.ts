import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import authReducer from './state/authSlice';
import { userApi } from './api/userApi';
import { categoriesApi } from './api/categoriesApi';
import { commentApi } from './api/commentApi';
import { contentPrivateApi, contentPublicApi } from './api/contentApi';
import { aboutApi } from './api/aboutApi';
import { feedbackApi } from './api/feedbackApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [contentPublicApi.reducerPath]: contentPublicApi.reducer,
        [contentPrivateApi.reducerPath]: contentPrivateApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [aboutApi.reducerPath]: aboutApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            categoriesApi.middleware,
            contentPublicApi.middleware,
            contentPrivateApi.middleware,
            commentApi.middleware,
            aboutApi.middleware,
            feedbackApi.middleware,
        ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
