<template>
  <customer-register-auth></customer-register-auth>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomerRegisterAuth from '@/modules/customer/auth/CustomerRegisterAuth.vue';
@Component({
  components: { CustomerRegisterAuth },
})
export default class CustomerRegister extends Vue {}
</script>

<style scoped></style>
