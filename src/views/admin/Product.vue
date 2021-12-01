<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <product-header></product-header>
      </v-col>
      <v-col cols="12">
        <products-list></products-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductsList from '@/modules/admin/products/ProductsList.vue';
import ProductHeader from '@/modules/admin/products/ProductHeader.vue';
@Component({
  components: { ProductHeader, ProductsList },
})
export default class Product extends Vue {}
</script>

<style scoped></style>
