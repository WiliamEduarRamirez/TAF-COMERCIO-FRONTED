<template>
  <customer-auth-layout>
    <auth-login></auth-login>
  </customer-auth-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomerAuthLayout from '@/layouts/customer/auth/CustomerAuthLayout.vue';
import AuthLogin from '@/modules/customer/auth/AuthLogin.vue';
@Component({
  components: { AuthLogin, CustomerAuthLayout },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
