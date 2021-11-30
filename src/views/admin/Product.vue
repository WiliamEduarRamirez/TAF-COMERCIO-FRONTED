<template>
  <v-container>
    <v-row></v-row>
    <v-row>
      <products-list></products-list>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductsList from '@/modules/admin/products/ProductsList.vue';
@Component({
  components: { ProductsList },
})
export default class Product extends Vue {}
</script>

<style scoped></style>
