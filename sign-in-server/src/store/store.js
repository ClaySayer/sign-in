import { configureStore } from '@reduxjs/toolkit';
import { staffSlice } from './slices/staffSlice.js';

const store = configureStore({
  reducer: {
    staff: staffSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
