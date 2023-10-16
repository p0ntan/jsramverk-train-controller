<template>
  <div v-if="this.$store.jwt">
    <button id="logoutUser" @click="logOut">Logga ut</button>
  </div>
  <div v-else>
    <button id="loginUser" @click="logIn">Logga in</button>
    <button id="registerUser" @click="register">Registrera</button>
    <a id="nav-tickets" href="/tickets">Visa ärenden</a>
  </div>
</template>

<script>
export default {
  emits: [
    'action'
  ],
  methods: {
    logIn() {
      this.$emit('action', 'login')
    },
    logOut() {
      this.$store.jwt = null;
    },
    register() {
      this.$emit('action','register')
    }
  }
}
</script>
