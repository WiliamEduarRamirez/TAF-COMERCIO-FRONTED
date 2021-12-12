<template>
  <v-container>
    <product-header></product-header>
    <products-list></products-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductsList from '@/features/admin/products/ProductsList.vue';
import ProductHeader from '@/features/admin/products/ProductHeader.vue';

@Component({
  components: { ProductHeader, ProductsList },
})
export default class Product extends Vue {}
</script>

<style scoped></style>
