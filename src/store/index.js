import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from './api/UserSlice.js';
import { donationSlice } from './api/DonationSlice.js';
import { bloodRequestSlice } from './api/BloodRequestSlicer.js';
import { bloodCountSlice } from './api/BloodCountSlice.js';

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [donationSlice.reducerPath]: donationSlice.reducer,
    [bloodRequestSlice.reducerPath]: bloodRequestSlice.reducer,
    [bloodCountSlice.reducerPath]: bloodCountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      bloodRequestSlice.middleware,
      donationSlice.middleware,
      bloodCountSlice.middleware
    ),
});

setupListeners(store.dispatch);
