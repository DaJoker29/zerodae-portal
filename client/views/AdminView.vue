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
  <CustomerList />
  <CreateCustomerForm />
</template>

<!-- 

Create a Customer Parameters
{
    address: {},
    description: "",
    email: "",
    metadata: {},
    name: ""
    payment_method: "",
    phone: "",
    shipping: {},
    tax: {}
}

-->
