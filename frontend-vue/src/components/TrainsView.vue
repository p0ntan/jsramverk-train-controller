<template>
  <div class="container">
    <div>
      <MenuBar @action="renderForm"/>
      <DelayedTable />
    </div>
    <DelayedMap />
    <UserForm v-if="isVisible" :formType="currentForm" v-model="isVisible"/>
  </div>
</template>

<script>
import DelayedTable from './DelayedTable.vue'
import DelayedMap from './DelayedMap.vue'
import MenuBar from './MenuBar.vue'
import UserForm from './UserForm.vue'

export default {
  data() {
    return {
      isVisible: false,
      formToUse: null
    };
  },
  components: {
    DelayedTable,
    DelayedMap,
    MenuBar,
    UserForm
  },
  methods: {
    renderForm(form) {
      // form is either 'login' or 'register'
      switch (form) {
        case "login":
          this.isVisible = true;
          this.currentForm = "login";
          break;
        case "register":
          this.isVisible = true;
          this.currentForm = "register";
          break;
        default:
          this.isVisible = false;
          this.currentForm = null;
      }
    }
  }
}
</script>
