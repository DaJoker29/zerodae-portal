<script>
import { formatPhone } from "../utils/helpers";

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
      this.$store.dispatch("auth/login", token);
    }
  },
  methods: {
    async onSubmit() {
      const email = this.input;
      const phone = formatPhone(this.input);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (email.indexOf("@") > -1) {
        options.body = JSON.stringify({ email });
      } else if (phone.length === 10) {
        options.body = JSON.stringify({ phone });
      } else {
        throw new Error(`Input not properly formatted`);
      }

      try {
        const response = await fetch("/api/auth/generate", options);

        if (response.ok) {
          this.tokenSent = true;
        } else {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (err) {
        console.error(err);
        this.error = true;
        this.error_msg = err;
      }
    },
  },
};
</script>

<template>
  <form v-if="!tokenSent && !error" id="login-form" @submit.prevent="onSubmit">
    <hgroup>
      <h3>Sign in</h3>
      <p>to access ZeroDae's Client Connect</p>
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

  <hgroup v-else-if="error">
    <h3>Bruh?!</h3>
    <p>{{ error_msg || "Something went wrong." }}</p>
    <p><a href="" @click="location.reload()">Start over</a></p>
  </hgroup>

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
