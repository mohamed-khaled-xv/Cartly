import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCartProducts = (state: RootState) => state.cart.products;

export const selectCartSubtotal = createSelector(
  [selectCartProducts],
  (products) =>
    products.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
);

export const selectItemQuantityById = (id: number) =>
  createSelector(
    [selectCartProducts],
    (products) => products.find((item) => item.id === id)?.quantity || 0
  );




