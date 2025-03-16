<script>
import SubscriptionListItem from "./SubscriptionListItem.vue";

export default {
  components: {
    SubscriptionListItem,
  },
};
</script>

<template>
  <section>
    <!-- <SubscriptionListItem
      v-for="subscription in this.$store.state.subscriptions"
      :subscription="subscription"
      :key="subscription.id"
    /> -->
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
}
</style>
