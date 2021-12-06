<template>
  <payment-form></payment-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PaymentForm from '@/modules/customer/payment/PaymentForm.vue';
@Component({
  components: { PaymentForm },
})
export default class PaymentView extends Vue {}
</script>

<style scoped></style>
