const state = {
  user: {},
};

const getters = {
  firstName(state) {
    return state.user.first_name;
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

export default { state, getters, mutations };
