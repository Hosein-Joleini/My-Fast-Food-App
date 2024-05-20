import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './features/cart/cartSlice';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import userSlice from './features/user/userSlice';

const store = configureStore({ reducer: { cart: cartSlice, user: userSlice } });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
