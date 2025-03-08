const state = {
  token: localStorage.getItem("token"),
};

const getters = {
  isAuthenticated: () => !!state.token,
};

const mutations = {
  authenticate(state, token) {
    localStorage.setItem("token", token);
  },
  logout(state) {
    localStorage.removeItem("token");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
