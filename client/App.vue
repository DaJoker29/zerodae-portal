<script>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import { mapState, mapStores } from "pinia";
import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";

export default {
  components: {
    Header,
  },
  async beforeMount() {
    // TODO: Check if user is authenticated and, if so, update user.
    const stillLoggedIn = await this.authStore.check();

    if (stillLoggedIn) {
      await this.userStore.fetchUser();
    } else {
      await this.userStore.$reset();
    }
  },
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated"]),
    ...mapStores(useAuthStore, useUserStore),
  },
};
</script>

<template>
  <Header v-if="isAuthenticated" :key="isAuthenticated" />
  <main class="page-content">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  margin: var(--gap);
  padding: var(--gap);
  background-color: var(--purple-100);
  border-radius: 1rem;
  color: var(--purple-900);
}
</style>
