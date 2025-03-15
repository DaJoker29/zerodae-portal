<script>
import { mapGetters } from "vuex/dist/vuex.cjs.js";
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    Header,
  },
  mounted() {
    this.$store.dispatch("auth/fetchUser");
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    }),
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
