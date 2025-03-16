import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    user: {
      id: "",
      name: { first: "", last: "", full: "" },
      email: "",
      phone: "",
      referralCode: "",
      stripe_id: "",
      isAdmin: false,
      createdAt: "",
      updatedAt: "",
    },
  }),
  getters: {
    isAdmin: (state) => !!state.user.isAdmin,
    firstName: (state) =>
      state.user.name.first ? state.user.name.first : "guest",
  },
  actions: {
    async fetchUser() {
      const response = await fetch("/api/auth/whoami", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        this.user = JSON.parse(JSON.stringify(user));
      }

      if (!response.ok && response.status === 401) {
        context.dispatch("logout");
      } else if (!response.ok) {
        context.dispatch("error", response.error);
      } else {
      }
    },
  },
});
