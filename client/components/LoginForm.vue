<script>
export default {
  data() {
    return {
      emailOrPhone: "",
      tokenSent: false,
      error: false,
      response: {},
    };
  },
  methods: {
    async onSubmit() {
      const input = this.emailOrPhone;
      const sanitized = input.replace(/\D/g, "").replace(/^1/g, "");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (input.indexOf("@") > -1) {
        options.body = JSON.stringify({ email: input });
        await fetch("/api/auth", options)
          .then(({ status }) => {
            if (status === 200) {
              this.tokenSent = true;
              this.response.heading = "Email Sent";
              this.response.message =
                "A login email is being sent. Click the link inside to log in.";
            } else {
              console.log(status);
            }
          })
          .catch((err) => this.displayError(err));
      } else if (sanitized.length === 10) {
        options.body = JSON.stringify({ phone: sanitized });
      }
    },
    displayError(err) {
      this.error = true;
      this.response.heading = "Something went wrong";
      this.response.message = err.message;
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
        v-model="emailOrPhone"
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
    <h3>{{ response.heading }}</h3>
    <p>{{ response.message }}</p>
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
