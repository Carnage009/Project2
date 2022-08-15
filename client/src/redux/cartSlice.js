import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const idx = state.products.findIndex(
        (p) => p._id === action.payload.product._id
      );
      if (idx > -1) {
        const product = state.products[idx];
        product.count++;
        state.products[idx] = product;
        state.totalPrice += product.price
      } else {
        state.products.push(action.payload.product);
        state.quantity++
        state.totalPrice = state.totalPrice + action.payload.product.count * action.payload.product.price
      }
    },
    removeProductFromCart(state, action) {
      const idx = state.products.findIndex(
        (p) => p._id === action.payload.product._id
      );
      const product = state.products[idx];
      if (product.count - 1 > 0) {
        product.count--;
        state.products[idx] = product;
      } else {
        state.products = state.products.filter(
          (p) => p._id !== action.payload.product._id
        );
        state.quantity--;
      }
      state.totalPrice -= product.price
    },
  },
});

export const { addToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;