<template>
<div class="toast" :class="[hasError ? 'warning' : 'success']" v-if="visible">{{ message }}</div>
</template>

<script>
export default {
props: {
    message: String
},
data() {
    return {
    visible: false,
    hasError: false,
    toastMessage: ''
    };
},
watch: {
    message() {
    this.visible = true
    if (this.message.includes('Error')) {
        this.hasError = true
    }
    setTimeout(() => {
        this.visible = false
        this.hasError = false
    }, 6000); // Hide the toast after x seconds
    }
}
}
</script>

<style scoped>
.toast {
display: block;
color: #000;
text-align: center;
padding: 10px 20px;
z-index: 1;
}

.success {
    background-color: #B7F7C4;
}

.warning {
    background-color: #FFB7B6;
}
</style>