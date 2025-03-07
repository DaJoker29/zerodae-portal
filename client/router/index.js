import { createRouter, createWebHistory } from "vue-router";

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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = `${to.name} — ${defaultTitle}`;
  } else {
    document.title = defaultTitle;
  }
  next();
});

export default router;
