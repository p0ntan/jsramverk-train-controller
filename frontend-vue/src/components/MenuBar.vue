<template>
  <div v-if="this.$store.jwt">
    <button @click="logOut">Logga ut</button>
  </div>
  <div v-else>
    <button @click="logIn">Logga in</button>
    <button @click="register">Registera</button>
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
