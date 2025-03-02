import { createStore } from "vuex";
import user from "./modules/user.js";
import subscriptions from "./modules/subscriptions.js";

const store = createStore({
  modules: {
    user,
    subscriptions,
  },
});

export default store;
