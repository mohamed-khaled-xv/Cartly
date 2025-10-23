import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../../services/home/models/cart-types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  products: CartItem[];
  shippingCost?: number;
}

const initialState: CartState = {
  products: [],
  shippingCost: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (action.payload.id === undefined) return;
      state.products.push({...action.payload, quantity: 1} as CartItem);
    },
    removeFromCartById: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload,
      );
    },
    updateQuantityById: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const item = state.products.find(
        product => product.id === action.payload.id,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: state => {
      state.products = [];
    },
  },
});

export const {addToCart, removeFromCartById, updateQuantityById, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
