import router from "../../router";

const state = {
  isLoggedIn: false,
  isAdmin: false,
};

const getters = {
  isAuthenticated(state) {
    return state.isLoggedIn;
  },
  isAdmin(state, getters, rootState) {
    return rootState.user.is_admin;
  },
};

const mutations = {
  login(state) {
    state.isLoggedIn = true;
  },
  logout(state) {
    state.isLoggedIn = false;
  },
  promoteAdmin(state) {
    state.isAdmin = true;
  },
  revokeAdmin(state) {
    state.isAdmin = false;
  },
};

const actions = {
  async fetchUser(context) {
    const response = await fetch("/api/auth/whoami", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      const user = await response.json();
      context.commit("login");
      context.commit("setUser", user, { root: true });
      router.push({ path: "/" });
    } else {
      console.error(response.error);
      context.commit("logout");
      context.commit("setUser", {}, { root: true });
      router.push({ path: "/login" });
    }
  },
  async login(context, token) {
    if (token) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        context.dispatch("fetchUser");
      } else {
        console.error();
      }
    }
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
