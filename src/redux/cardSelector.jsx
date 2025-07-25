// redux/cartSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.cardselectitems;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, item) => total + Number(item.quantityNumber || 0), 0)
);

export const selectCartTotalAmount = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce(
      (total, item) =>
        total +
        (Number(item.quantityNumber || 0) * Number(item.saleAmount || 0)),
      0
    )
);
