const state = {
  token: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
};

export default {
  namespaced: true,
  state,
  getters,
};
