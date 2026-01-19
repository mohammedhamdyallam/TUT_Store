import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.cart.find((p) => p.id === action.payload.id);
      if (exist) {
        exist.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        product.qty = Math.max(1, qty);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
