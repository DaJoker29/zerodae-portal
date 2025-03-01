import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";

const defaultTitle = "ZeroDae User Portal";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      meta: {
        title: "Dashboard",
      },
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/account",
      name: "Account",
      meta: {
        title: "Account Settings",
      },
      component: () => import("../views/AccountView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} — ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }
  next();
});

export default router;
