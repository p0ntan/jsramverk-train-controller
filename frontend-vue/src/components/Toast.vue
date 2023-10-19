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
position: absolute;
bottom: 20px;
left: 40%;
z-index: 5000;
height: 100px;
min-width: 200px;
border-radius: 4px;
color: #000;
text-align: center;
padding: 20px 20px 10px;
}

.success {
    background-color: #B7F7C4;
}

.warning {
    background-color: #FFB7B6;
}
</style>