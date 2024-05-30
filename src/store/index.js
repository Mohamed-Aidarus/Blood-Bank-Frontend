import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from './api/UserSlice.js';

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
});

setupListeners(store.dispatch);