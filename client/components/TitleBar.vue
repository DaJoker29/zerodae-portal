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
        ><SVGLogout /> <span class="titlebar__logout--text">LOGOUT</span>
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
  background-color: var(--purple-700);
  color: var(--white);
  gap: var(--gap);
  padding: var(--gap-xs) var(--gap);
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
  color: var(--purple-500);
  text-decoration: none;
  padding: var(--gap-sm) var(--gap);
  padding-right: 0;
  border-radius: 0.25rem;
  transition: color 0.3s, opacity 0.3s;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: var(--gap);
  opacity: 0.7;
}

.titlebar a:hover {
  color: var(--red-500);
  opacity: 1;
}

@media (max-width: 768px) {
  .titlebar__logout {
    font-size: 1.5rem;
  }
  .titlebar__logout--text {
    display: none;
  }

  .titlebar a {
    opacity: 1;
    color: var(--white);
  }
}

@media (max-width: 480px) {
  .titlebar__greeting {
    display: none;
  }
}
</style>
