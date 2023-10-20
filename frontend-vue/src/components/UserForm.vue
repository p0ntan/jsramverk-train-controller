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
        <input type="email" id="email" v-model="email" required placeholder="Skriv in din epost">
      </div>
      
      <div>
        <label for="password">Lösenord:</label>
        <input type="password" id="password" v-model="password" required placeholder="Skriv in lösenord">
      </div>

      <div v-if="formType === 'register'">
        <label for="password2">Lösenord (igen):</label>
        <input type="password" id="password2" v-model="password2" required placeholder="Skriv in lösenord">
      </div>

      <!-- Button depending on what form is used -->
      <p v-if="formType === 'register'" class="small-text">Du loggas in automatiskt vid registrering.</p>
      <button class="button-green" v-if="formType === 'login'" type="submit">Logga in</button>
      <button class="button-blue" v-else-if="formType === 'register'" type="submit">Registrera</button>
    </form>

  </div>
</template>

<script>
const graphqlURL = import.meta.env.VITE_GRAPHQL_URL

export default {
  props: {
    modelValue: Boolean,
    formType: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'show-toast'],
  data() {
    return {
      email: '',
      password: '',
      password2: ''
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
      this.$emit('update:modelValue', false)
    },
    showToast(message) {
      this.$emit('show-toast', message)
    },
    register() {
      const passwordOk = this.checkPassword()
      
      if (!passwordOk) {
        this.showToast("Error: Lösenorden matchar inte.")
      } else {
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
            this.closeBox()
            this.showToast(result.errors[0].message)
          }
        })
      } catch (err) {
        console.error(err);
      }
    },
    checkPassword() {
      if (this.password !== this.password2) {
        return false
      }
      return true
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
  height: 520px;
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

.small-text {
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
}
</style>