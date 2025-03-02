<script>
import SVGCopy from "./SVGCopy.vue";
import TitleBar from "./TitleBar.vue";
import MainNav from "./MainNav.vue";
import ProfileInfo from "./ProfileInfo.vue";

export default {
  components: {
    SVGCopy,
    TitleBar,
    MainNav,
    ProfileInfo,
  },
};
</script>

<template>
  <header class="page-header">
    <TitleBar />
    <ProfileInfo />
    <MainNav />
  </header>
</template>
