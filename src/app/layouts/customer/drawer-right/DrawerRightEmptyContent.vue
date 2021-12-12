<template>
  <div class="empty-cart-sidebar d-flex flex-column justify-center align-center mt-10">
    <div class="v-avatar mb-8 rounded-0" style="height: 90px; min-width: 90px; width: 90px">
      <img :src="require('@/app/assets/images/empty-cart.png')" alt="" />
    </div>
    <p class="grey--text text--darken-2 px-5 mx-10 text-center">
      Tu carrito de compras se encuentra vacia. Empieza a comprar
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DrawerRightContent extends Vue {}
</script>

<style scoped>
.empty-cart-sidebar {
  height: 80vh;
}
</style>
