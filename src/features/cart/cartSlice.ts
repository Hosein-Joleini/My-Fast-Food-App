import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type CartStateType } from '../../../types/global';
import { type RootState } from '../../store';

type CartState = { cart: CartStateType[] };

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartStateType>) {
      state.cart.push(action.payload);
    },

    increaseItemByQuantity(state, action: PayloadAction<number>) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );

      existingItem!.quantity++;
    },

    decreaseItemByQuantity(state, action: PayloadAction<number>) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );

      if (existingItem!.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      } else {
        existingItem!.quantity--;
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItemToCart,
  increaseItemByQuantity,
  decreaseItemByQuantity,
  clearCart,
} = cartSlice.actions;

export const getCartItems = (state: RootState) => state.cart.cart;
export const getTotalPriceCartItems = (state: RootState) =>
  state.cart.cart.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice!;
  }, 0);
export const getTotalQuantityCartItems = (state: RootState) =>
  state.cart.cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

export default cartSlice.reducer;
