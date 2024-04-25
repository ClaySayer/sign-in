import { configureStore } from '@reduxjs/toolkit';
import staffSlice from './slices/staffSlice';
import socketMiddleware from '../sockets/socket';

const store = configureStore({
  reducer: {
    staff: staffSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
