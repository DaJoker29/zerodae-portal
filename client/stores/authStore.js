import { defineStore } from "pinia";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({ isAuthenticated: false }),
  actions: {
    async check() {
      const response = await fetch("/api/auth/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.isAuthenticated = true;
        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    },
    async login(token) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        this.isAuthenticated = true;
        return true;
      } else {
        console.error(response.error);
        this.isAuthenticated = false;
        return false;
      }
    },
    logout() {},
  },
});

const actions = {
  async fetchUser(context) {
    const response = await fetch("/api/auth/whoami", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok && response.status === 401) {
      context.dispatch("logout");
    } else if (!response.ok) {
      context.dispatch("error", response.error);
    } else {
      const user = await response.json();
      context.dispatch("login", user);
    }
  },
};
