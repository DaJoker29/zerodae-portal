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
      meta: { requiresAuth: true },
    },
    {
      path: "/account",
      name: "Account Settings",
      component: () => import("../views/AccountView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "Admin Panel",
      component: () => import("../views/AdminView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/add-subscription",
      name: "Add a Subscription",
      props: true,
      component: () => import("../views/NewSubscriptionView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: "login",
      query: { redirect: to.fullPath },
    };
  }
});

router.afterEach((to, from) => {
  if (to.name) {
    document.title = `${to.name} — ${store.state.app.name}`;
  } else {
    document.title = store.state.app.name;
  }
});

export default router;
