const state = {
  isLoggedIn: false,
};

const getters = {
  isAuthenticated(state) {
    return state.isLoggedIn;
  },
};

const mutations = {
  login(state) {
    state.isLoggedIn = true;
  },
  logout(state) {
    state.isLoggedIn = false;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
};
