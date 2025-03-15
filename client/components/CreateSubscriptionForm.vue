<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      plans: [],
      data: {
        customer: this.id,
        selectedPlan: "",
        primary_domain: "",
        alternate_domains: [],
        alternate_domain_id: "",
      },
    };
  },
  async mounted() {
    await fetch("/api/subscriptions/types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.plans = json.filter((e) => e.metadata.product_type === "plan");
        const altProduct = json.find(
          (e) => e.metadata.isAltDomainFlag === "true"
        );
        this.data.alternate_domain_id = altProduct.default_price.id;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    updateAlternateDomains(e) {
      this.data.alternate_domains = e.target.value.split(/\n/);
    },
    async submitForm() {
      await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    },
    resetForm() {
      this.data = {
        customer: this.id,
        selectedPlan: "",
        primary_domain: "",
        alternate_domains: [],
      };
      document.querySelector("#new-subscription-form").reset();
    },
  },
};
</script>

<template>
  <hgroup>
    <h2>Add Subscription</h2>
    <p><small>Customer ID</small> {{ id }}</p>
  </hgroup>
  <hr />
  <form id="new-subscription-form">
    <fieldset>
      <hr />

      <label for="plan_type"
        >Select Plan

        <select name="plan" id="plan_type" v-model="data.selectedPlan">
          <option value="" disabled selected>Please select Service Plan</option>
          <option
            v-for="plan in plans"
            :key="plan.id"
            :value="plan.default_price.id"
          >
            {{ plan.name }} — ${{
              plan.default_price.unit_amount / 100
            }}/monthly
          </option>
        </select>
      </label>
      <label for="primary_domain">
        Choose Domain Name
        <input
          type="text"
          id="primary_domain"
          name="primary_domain"
          v-model="data.primary_domain"
        />
      </label>
      <label for="alternate_domains">Add'l Domains</label>
      <textarea
        name="alternate_domains"
        id="alternate_domains"
        @input="updateAlternateDomains"
      ></textarea>
      <hr />
      <input type="submit" value="Submit" @click.prevent="submitForm" />
      <input type="reset" value="Clear" @click.prevent="resetForm" />
    </fieldset>
  </form>
  <pre>{{ data }}</pre>
</template>

<style scoped>
hgroup > p {
  color: var(--grey-500);
}

hgroup > p > small {
  color: var(--purple-900);
}
</style>
