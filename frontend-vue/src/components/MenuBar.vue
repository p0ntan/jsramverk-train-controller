<template>
  <div v-if="this.$store.jwt">
    Här är den satt
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
    register() {
      this.$emit('action','register')
    }
  }
}
</script>
