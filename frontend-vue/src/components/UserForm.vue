<template>
  <div class="fullsize-wrapper">
  </div>
  <div class="user-form">
      <button class="button-close" @click="closeBox">X</button>
      <!-- Heading depending on what form is used -->
      <h2 v-if="formType === 'login'">Logga in</h2>
      <h2 v-else-if="formType === 'register'">Registrera</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required placeholder="Enter your email">
      </div>
      
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required placeholder="Enter your password">
      </div>

        <!-- Button depending on what form is used -->
        <button class="button-green" v-if="formType === 'login'" type="submit">Logga in</button>
        <button class="button-blue" v-else-if="formType === 'register'" type="submit">Registrera</button>
      </form>
    </div>
</template>

<script>
const graphqlURL = import.meta.env.VITE_GRAPHQL_URL

export default {
  props: {
    formType: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'show-toast'],
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // Handle the login logic here.
      // console.log("Email:", this.email, "Password:", this.password)
      if (this.formType === 'login') {
        this.login()
      } else if (this.formType ==='register') {
        this.register()
      }
    },
    closeBox() {
      this.$emit('close', null)
    },
    showToast(message) {
      this.$emit('show-toast', message)
    },
    register() {
      const mutateTicket = `mutation {
          createUser (
          email: "${this.email}",
          password: "${this.password}",
          ) { message }
      }`

      try {
        // Fetch data via graphql
        fetch(`${graphqlURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: mutateTicket })
        })
        .then(response => response.json())
        .then(result => {
          if (!result.errors) {
            // Login went ok
            // console.log(result.data.createUser.message);
            this.login()
          } else {
            this.closeBox()
            this.showToast(result.errors[0].message)
          }
        })
      } catch (err) {
        console.error(err);
      }
    },
    login() {
      const mutateTicket = `mutation {
          authUser (
          email: "${this.email}",
          password: "${this.password}",
          ) {
            jwt
          }
      }`

      try {
        // Fetch data via graphql
        fetch(`${graphqlURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: mutateTicket })
        })
        .then(response => response.json())
        .then(result => {
          if (!result.errors) {
            this.$store.jwt = result.data.authUser.jwt
            this.closeBox()
            this.showToast('Login successful!')
          } else {
            this.showToast(result.errors[0].message)
          }
        })
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.fullsize-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: white;
  opacity: 0.6;
  z-index: 2000;
}
.user-form {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background-color: white;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 480px;
  top: 50%;
  left: 50%;
  z-index: 5000;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 #30404b38;
}

.user-form h2 {
  margin-left: 0.6rem;
}
.user-form form {
  margin: 0.4rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.button-close {
  width: 44px;
  height: 44px;
  margin-left: auto;
  border: 1px solid #dddddd;
}

form {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.2rem;
}

form > div {
  margin-bottom: 0.5rem;
}

form input {
  min-width: 100%;
  max-width: 100%;
}

form button {
  font-size: 1.5rem;
  margin-top: auto;
}
</style>