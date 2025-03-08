<script>
import CreateSubscriptionForm from "../components/CreateSubscriptionForm.vue";

export default {
  components: {
    CreateSubscriptionForm,
  },
};
</script>

<template>
  <CreateSubscriptionForm :id="this.$route.query.customer" />
</template>
