<template>
  <admin-auth-layout title="INICIAR SESIÓN">
    <admin-login-form></admin-login-form>
  </admin-auth-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminAuthLayout from '@/layouts/admin/auth/AdminAuthLayout.vue';
import AdminLoginForm from '@/modules/admin/auth/AdminLoginForm.vue';
@Component({
  components: { AdminLoginForm, AdminAuthLayout },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
