<script>
export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    resetForm() {
      document.querySelector("#create-customer-form").reset();
      this.data.name = "";
      this.data.email = "";
    },
    async submitForm() {
      // Send Form Data to API Here...
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
      console.log(response);

      this.resetForm();
    },
  },
};
</script>

<template>
  <section>
    <hgroup>
      <h3>Create a Customer</h3>
      <p>
        {{ data }}
      </p>
    </hgroup>

    <form id="create-customer-form">
      <fieldset>
        <hr />
        <label for="customer_name"
          >Customer Name
          <input
            type="text"
            id="customer_name"
            placeholder="Enter customer name"
            v-model="data.name"
          />
        </label>

        <label for="customer_email">
          Email Address
          <input
            type="text"
            id="customer_email"
            placeholder="Enter email address"
            v-model="data.email"
          />
        </label>

        <hr />
        <input type="submit" value="Submit" @click.prevent="submitForm" />
        <input type="reset" value="Clear" @click.prevent="resetForm" />
      </fieldset>
    </form>
  </section>
</template>
