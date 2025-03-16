import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    name: "ZeroDae User Portal",
  }),
});
