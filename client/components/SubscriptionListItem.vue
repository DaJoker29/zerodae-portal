<script>
export default {
  props: ["subscription"],
  computed: {
    isActive() {
      return this.subscription.status === "active";
    },
  },
};
</script>

<template>
  <article>
    <hgroup>
      <h3>{{ subscription.domain.toUpperCase() }}</h3>
      <p :class="{ isActive }">
        {{ subscription.status.toUpperCase() }}
      </p>
    </hgroup>
    {{ subscription }}
  </article>
</template>

<style scoped>
article {
  border-top: 2px solid var(--purple-900);
  margin-top: var(--gap);
}

hgroup {
  display: flex;
  justify-content: space-between;

  & p {
    color: var(--grey-500);
  }

  & p.isActive {
    color: var(--bluegreen-700);
  }
}
</style>
