<script>
import SVGLogout from "./SVGLogout.vue";

export default {
  components: {
    SVGLogout,
  },
  computed: {
    greeting() {
      return `Welcome back, ${this.$store.state.user.first_name}`;
    },
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

<template>
  <div class="titlebar">
    <div class="titlebar__start">
      <img class="titlebar__logo" src="../assets/logo.webp" alt="" />
      <h2 class="titlebar__title">
        {{ routeName }}
      </h2>
    </div>
    <div class="titlebar__end">
      <span class="titlebar__greeting">{{ greeting }} </span>
      <router-link class="titlebar__logout" to="/logout"
        ><SVGLogout class="titlebar__logout--icon" />
        <span class="titlebar__logout--text">LOGOUT</span>
      </router-link>
    </div>
  </div>
</template>

<style>
.titlebar {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap);
  margin: var(--gap);
  margin-bottom: var(--gap-xs);
}

.titlebar__logo {
  height: var(--text-xl);
  width: auto;
  padding-right: var(--gap);
}

.titlebar__title {
  display: inline;
  vertical-align: middle;
}

.titlebar__end {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap);
  align-items: center;
}

.titlebar a {
  color: var(--purple-300);
  text-decoration: none;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  opacity: 0.6;
  color: var(--red-500);
}

.titlebar a:hover {
  opacity: 1;
  color: var(--red-500);
}

@media (max-width: 768px) {
  .titlebar__logout--icon {
    font-size: 1.5em;
  }
  .titlebar__logout--text {
    display: none;
  }
}

@media (max-width: 480px) {
  .titlebar__greeting {
    display: none;
  }
}
</style>
