<script>
import SVGCopy from "./SVGCopy.vue";

export default {
  components: {
    SVGCopy,
  },
  methods: {
    async copy(value) {
      try {
        await navigator.clipboard.writeText(this.$store.state.user[value]);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
  },
};
</script>

<template>
  <aside>
    <div>
      <small>User ID</small>
      <p title="Click to copy user ID" @click="copy('id')">
        {{ this.$store.state.user.id }}&nbsp;<SVGCopy />
      </p>
    </div>
    <div>
      <small>Referral Code</small>
      <p title="Click to copy referral code" @click="copy('referral_code')">
        {{ this.$store.state.user.referral_code }}&nbsp;<SVGCopy />
      </p>
    </div>
  </aside>
</template>

<style scoped>
aside {
  margin-inline: var(--gap);
  margin-bottom: var(--gap-xxl);
  display: flex;
  flex-flow: row wrap;
  gap: var(--gap-xl);
  color: var(--grey-300);
}

aside > div {
  display: flex;
  gap: var(--gap-sm);
  align-items: baseline;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

aside > div:hover {
  opacity: 1;
}
aside small {
  /* font-weight: 300; */
  text-transform: uppercase;
}

aside p {
  display: flex;
  align-items: center;
}
</style>
