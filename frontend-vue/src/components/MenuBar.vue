<template>
  <div class="menu-bar" v-if="this.$store.jwt">
    <button id="logoutUser" class="button-blue button-big" @click="logOut">Logga ut</button>
    <a id="nav-tickets" class="button button-blue button-big" @click.prevent="renderTicketView">Visa ärenden</a>
  </div>
  <div class="menu-bar" v-else>
    <button id="loginUser" class="button-green button-big" @click="logIn">Logga in</button>
    <button id="registerUser" class="button-blue button-big" @click="register">Registrera</button>
    <a id="nav-tickets" class="button button-blue button-big" @click.prevent="renderTicketView">Visa ärenden</a>
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
    },
    renderTicketView() {
      this.$store.train = null
      this.$router.push('/tickets')
    }
  }
}
</script>

<style>
.menu-bar {
  display: flex;
  padding: 0.4rem 2rem 0rem;
  width: 100%;
}

#nav-tickets {
  margin-left: auto;
}
</style>