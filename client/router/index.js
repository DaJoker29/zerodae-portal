import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";

const defaultTitle = "ZeroDae User Portal";

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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.name} — ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }
  next();
});

export default router;
