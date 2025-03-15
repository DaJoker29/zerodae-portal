<script>
import { RouterLink } from "vue-router";
import SVGChecklistNote from "./svg/SVGChecklistNote.vue";
import SVGPlus from "./svg/SVGPlus.vue";

export default {
  components: {
    SVGChecklistNote,
    SVGPlus,
  },
  data() {
    return {
      customers: [],
    };
  },
  async mounted() {
    await this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      await fetch("/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => (this.customers = data))
        .catch((err) => console.error(err));
    },
  },
};
</script>

<template>
  <section>
    <hgroup>
      <h3>Customer List</h3>
    </hgroup>

    <table>
      <caption>
        Zero Daedalus Customer List
      </caption>

      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <th scope="row">{{ customer.name }}</th>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <a
              :href="customer.stripe_url"
              target="_blank"
              title="Manage in Stripe"
            >
              <SVGChecklistNote />
            </a>
            <RouterLink
              :to="{
                path: '/add-subscription',
                query: { customer: customer.id },
              }"
              title="Add New Subscription"
            >
              <SVGPlus />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  caption-side: bottom;
}

thead {
  border-block: 2px solid;
}

th:first-child {
  position: sticky;
  inset-inline-start: 0;
}

tbody tr:nth-child(even) {
  background-color: var(--white);
}

.icon {
  cursor: pointer;
}

tbody td:last-child {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap-sm);
  align-items: center;
}
</style>
