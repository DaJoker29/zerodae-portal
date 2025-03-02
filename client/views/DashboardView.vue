<script>
import SubscriptionList from "../components/SubscriptionList.vue";

export default {
  components: {
    SubscriptionList,
  },
};
</script>

<template>
  <hgroup>
    <h2>Subscriptions</h2>
    <p>Active Subscriptions</p>
  </hgroup>

  <SubscriptionList />
</template>
