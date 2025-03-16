<script>
import { mapStores } from "pinia";
import { validateInput } from "../utils/helpers";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import router from "../router";

export default {
  data() {
    return {
      input: "",
      tokenSent: false,
      error: false,
      error_msg: "",
      response: {},
    };
  },
  async mounted() {
    const { token } = this.$route.query;
    if (token) {
      const isLoggedIn = await this.authStore.login(token);

      if (isLoggedIn) {
        await this.userStore.fetchUser();
        const route = this.userStore.isAdmin ? "/admin" : "/";
        this.$router.push(route);
      }
    }
  },
  computed: {
    ...mapStores(useAuthStore, useUserStore),
  },
  methods: {
    async onSubmit() {
      const body = validateInput(this.input);

      if (!body) {
        this.error = true;
        return (this.error_msg =
          "Address or mobile number was properly formatted.");
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      const response = await fetch("/api/auth/generate", options).catch(
        (err) => {
          console.error(err);
          this.error = true;
          this.error_msg = err.status;
        }
      );

      if (response.ok) {
        this.tokenSent = true;
      } else {
        console.error(response.error);
        this.error = true;
        this.error_msg = "Something went wrong";
      }
    },
  },
};
</script>

<template>
  <form v-if="!tokenSent" id="login-form" @submit.prevent="onSubmit">
    <hgroup>
      <h3>{{ error ? "Error" : "Sign in" }}</h3>
      <p>{{ error_msg || "to access ZeroDae's Client Connect" }}</p>
    </hgroup>

    <fieldset>
      <input
        id="emailOrPhoneInput"
        type="text"
        placeholder="Email address or mobile number"
        required
        pattern="([a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$|\+*[0-9]{0,2} *\(*[0-9]{3}[\) ]*[0-9]{3}-*[0-9]{4})"
        oninvalid="this.setCustomValidity('Must be a valid email address or 10-digit phone number')"
        oninput="this.setCustomValidity('')"
        v-model="input"
      />
      <input type="submit" value="Sign In" />
    </fieldset>

    <footer>
      Don't have a ZeroDae account?
      <a
        href="https://www.zerodaedal.us/#contact"
        target="_blank"
        rel="noopener noreferrer"
        >Hire us!</a
      >
    </footer>
    <small>&copy; 2025 Zero Daedalus, LLC. All Rights Reserved.</small>
  </form>

  <hgroup v-else>
    <h3>Email Sent</h3>
    <p>A login email is being sent. Click the link inside to log in.</p>
  </hgroup>
</template>

<style scoped>
form {
  margin-block: var(--gap);
  margin-inline: auto;
  max-width: 30ch;
  display: grid;
  place-content: center;
  gap: var(--gap-lg);
}

fieldset {
  text-align: center;
  padding: 0;

  & input {
    width: 100%;
    margin-inline: 0;
  }
}

footer {
  margin-top: var(--gap-xl);
}

small {
  color: var(--grey-300);
}
</style>
