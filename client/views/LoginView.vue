<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  async mounted() {
    const { token } = this.$route.query;
    if (token) {
      const { status } = await fetch(`/api/auth/token?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status === 200) {
        this.$store.commit("auth/authenticate", token);
        this.$router.push({ path: "/" });
      } else if (status === 403) {
        console.error();
      }
    }
  },
};
</script>

<template>
  <LoginForm />
</template>
