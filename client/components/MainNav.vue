<script>
import SVGComputer from "./SVGComputer.vue";
import SVGArrowList from "./SVGArrowList.vue";
import SVGUserCircle from "./SVGUserCircle.vue";

export default {
  components: {
    SVGComputer,
    SVGArrowList,
    SVGUserCircle,
  },
};
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-link"><SVGArrowList /> Dashboard</RouterLink>
    <RouterLink to="/account" class="nav-link"
      ><SVGUserCircle /> Account</RouterLink
    >
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-flow: row wrap;
  gap: var(--gap);
  margin-bottom: var(--gap-lg);
  margin-inline: var(--gap);
  align-items: center;
}

nav a {
  color: var(--purple-300);
  padding: var(--gap-xs) var(--gap);
  border-radius: var(--gap-xs);
  display: flex;
  gap: var(--gap-sm);
  align-items: center;
  vertical-align: middle;
  text-decoration: none;
}

nav a.isActiveLink {
  color: var(--purple-900);
  background-color: var(--purple-300);
}
</style>
