// Trong currency-store.js
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency-store", {
  actions: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
});
