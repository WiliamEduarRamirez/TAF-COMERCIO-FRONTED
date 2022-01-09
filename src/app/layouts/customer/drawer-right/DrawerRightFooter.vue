<template>
  <div class="pa-2">
    <v-btn color="primary" @click="checkNow" block class="my-2 text-capitalize">
      Verificar ahora (S/.{{ formatDecimal(totalPrice) }})
    </v-btn>
    <v-btn color="primary" outlined block class="my-2 text-capitalize"> Ver Carrito </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from '@/app/models/user';
import FormatMixin from '@/app/common/mixins/formatMixin';
const shoppingCart = namespace('shoppingCart');
const user = namespace('user');

@Component
export default class DrawerRightFooter extends Mixins(FormatMixin) {
  @shoppingCart.Getter
  totalPrice!: number;

  @user.Getter
  user!: User | null;

  checkNow(): void {
    if (this.user) {
      console.log(this.user);
      this.$router.push({ name: 'payments' });
    } else {
      this.$router.push({ name: 'customer-login-check' });
    }
  }
}
</script>

<style scoped></style>
