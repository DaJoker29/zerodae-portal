import { createStore } from "vuex";
import user from "./modules/user.js";
import subscriptions from "./modules/subscriptions.js";
import app from "./modules/app.js";
import auth from "./modules/auth.js";

const store = createStore({
  modules: {
    user,
    subscriptions,
    app,
    auth,
  },
});

export default store;
