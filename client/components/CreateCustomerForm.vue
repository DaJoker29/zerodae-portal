<script>
import StateDropdown from "./StateDropdown.vue";

const model = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    country: "US",
    line1: "",
    line2: "",
    postal_code: "",
    state: "",
  },
};

export default {
  components: {
    StateDropdown,
  },
  data() {
    return {
      data: model,
    };
  },
  methods: {
    resetForm() {
      this.data = model;
      document.querySelector("#create-customer-form").reset();
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

      this.resetForm();
    },
    updateState(value) {
      this.data.address.state = value;
    },
    updatePhone() {
      // TODO: #4 #3 Fix phone formatting to stripe nondigits and add "+1" before submitting to stripe.
      let number = this.data.phone;
      number = number.replace(/\D/g, "");

      if (number.length > 3) {
        number = `(${number.substring(0, 3)}) ${number.substring(3)}`;
      }

      if (number.length > 9) {
        number = `${number.substring(0, 9)}-${number.substring(9)}`;
      }

      this.data.phone = number;
    },
  },
};
</script>

<template>
  <section>
    <hgroup>
      <h3>Create a Customer</h3>
    </hgroup>

    <form id="create-customer-form">
      <hr />
      <fieldset>
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

        <label for="customer_phone"
          >Phone Number
          <input
            type="tel"
            id="customer_phone"
            placeholder="(123) 456-7890"
            pattern="([0-9]{3}) [0-9]{3}-[0-9]{4}"
            @keyup="updatePhone"
            v-model="data.phone"
          />
        </label>

        <label for="customer_address"
          >Address
          <input
            type="text"
            id="customer_address"
            placeholder="555 ZeroDae Ln."
            v-model="data.address.line1"
          />
          <input
            type="text"
            id="customer_address2"
            placeholder="Apt. 123"
            v-model="data.address.line2"
          />
          <input
            type="text"
            id="customer_city"
            placeholder="City"
            v-model="data.address.city"
          />
          <StateDropdown @update:state="updateState" />
          <input
            type="text"
            id="customer_postal_code"
            placeholder="Postal Code"
            v-model="data.address.postal_code"
          />
        </label>
      </fieldset>
      <hr />
      <input type="submit" value="Submit" @click.prevent="submitForm" />
      <input type="reset" value="Clear" @click.prevent="resetForm" />
    </form>
  </section>
</template>

<style scoped>
fieldset {
  display: flex;
  flex-flow: row wrap;
  gap: var(--gap);
}

fieldset > * {
  flex: 1 1 30ch;
}
</style>
