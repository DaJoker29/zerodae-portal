<script>
import CreateCustomerForm from "../components/CreateCustomerForm.vue";
import CustomerList from "../components/CustomerList.vue";

export default {
  components: {
    CreateCustomerForm,
    CustomerList,
  },
};
</script>

<template>
  <CreateCustomerForm />
  <CustomerList />
</template>
