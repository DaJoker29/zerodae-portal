import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "isActiveLink",
  linkExactActiveClass: "isExactActive",
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/account",
      name: "Account Settings",
      component: () => import("../views/AccountView.vue"),
    },
    {
      path: "/admin",
      name: "Admin Panel",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/add-subscription",
      name: "Add a Subscription",
      props: true,
      component: () => import("../views/NewSubscriptionView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (!isAuthenticated && to.name !== "Login") {
    next({ name: "Login" });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  setTitle(to.name);
});

function setTitle(name) {
  if (name) {
    document.title = `${name} — ${store.state.app.name}`;
  } else {
    document.title = store.state.app.name;
  }
}

export default router;
