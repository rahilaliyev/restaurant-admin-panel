import { atom } from "recoil";

export const waitersAtom = atom({
  key: "WAITERS_DATA",
  default: [],
});

export const mealsAtom = atom({
  key: "MEALS_DATA",
  default: [],
});

export const ordersAtom = atom({
  key: "ORDERS_DATA",
  default: [],
});

export const mealsOptionAtom = atom({
  key: "MEALS_OPTION",
  default: [],
});
