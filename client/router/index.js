import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useAppStore } from "../stores/appStore";

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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: "login",
      query: { redirect: to.fullPath },
    };
  }
});

router.afterEach((to, from) => {
  const appStore = useAppStore();

  if (to.name) {
    document.title = `${to.name} — ${appStore.name}`;
  } else {
    document.title = appStore.name;
  }
});

export default router;
