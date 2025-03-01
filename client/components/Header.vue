<script>
import SVGCopy from "./SVGCopy.vue";
import TitleBar from "./TitleBar.vue";
import MainNav from "./MainNav.vue";

export default {
  components: {
    SVGCopy,
    TitleBar,
    MainNav,
  },
};
</script>

<template>
  <header class="page-header">
    <TitleBar />
    <MainNav />

    <span class="status-tag is-inactive">INACTIVE</span>
    <h1 class="heading__account-holder"></h1>
    <ul class="list__account-details">
      <li>ID: <span class="account-id"></span></li>
      <li>
        Referral Code:
        <span TitleBar="Click to copy referral code" class="referral-code">
          <SVGCopy />
          <span class="referral-code-output"></span>
        </span>
      </li>
      <li>Company: <span class="company-name"></span></li>
    </ul>
  </header>
</template>

<style scoped>
.status-tag {
  font-size: 1.5rem;
  font-weight: 500;
}

.status-tag.is-active {
  color: var(--green-500);
}

.status-tag.is-inactive {
  color: var(--grey-300);
}

.heading__account-holder {
  color: var(--purple-500);
}

.list__account-details {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--grey-300);
  display: flex;
  gap: 0 var(--gap);
  flex-flow: wrap;
}

.list__account-details > li > span {
  color: var(--purple-500);
}

.referral-code {
  cursor: help;
  border-bottom: 0.12em dashed var(--purple-500);
}

.referral-code > svg {
  height: 1em;
  width: 1em;
  display: inline;
}
</style>
