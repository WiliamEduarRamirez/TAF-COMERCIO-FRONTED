<template>
  <div class="pa-2">
    <v-btn color="primary" @click="onPayment" block class="my-2 text-capitalize">
      Verificar ahora (S/.{{ formatDecimal(totalPrice) }})
    </v-btn>
    <v-btn color="primary" outlined block class="my-2 text-capitalize"> Ver Carrito </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const shoppingCart = namespace('shoppingCart');

@Component
export default class DrawerRightFooter extends Vue {
  @shoppingCart.Getter
  totalPrice!: number;

  onPayment(): void {
    this.$router.push({ name: 'payments' });
  }
}
</script>

<style scoped></style>
