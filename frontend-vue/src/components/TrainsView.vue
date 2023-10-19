<template>
  <div>
    <!-- Toast message has to be in the same wrapper div as the other components -->
    <Toast :message="toastMessage" />
    <div class="container">
      <div>
        <MenuBar @action="renderForm"/>
        <DelayedTable />
      </div>
      <DelayedMap />
      <UserForm v-if="isVisible" :formType="currentForm" @show-toast="displayToast" v-model="isVisible"/>
    </div>
</div>
</template>

<script>
import DelayedTable from './DelayedTable.vue'
import DelayedMap from './DelayedMap.vue'
import MenuBar from './MenuBar.vue'
import UserForm from './UserForm.vue'
import Toast from './Toast.vue'

export default {
  data() {
    return {
      isVisible: false,
      formToUse: null,
      toastMessage: ''
    };
  },
  components: {
    DelayedTable,
    DelayedMap,
    MenuBar,
    UserForm,
    Toast,
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
    },
    displayToast(message) {
      this.toastMessage = message
    }
  }
}
</script>
