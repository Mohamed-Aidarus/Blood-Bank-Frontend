import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from './api/UserSlice.js';
import { donationSlice } from './api/DonationSlice.js';
import { bloodRequestSlice } from './api/BloodRequestSlicer.js';

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [donationSlice.reducerPath]: donationSlice.reducer,
    [bloodRequestSlice.reducerPath]: bloodRequestSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      bloodRequestSlice.middleware,
      donationSlice.middleware
    ),
});

setupListeners(store.dispatch);
