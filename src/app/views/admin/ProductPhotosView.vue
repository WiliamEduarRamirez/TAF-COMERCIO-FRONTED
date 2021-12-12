<template>
  <v-container>
    <product-photos-header></product-photos-header>
    <product-photos-list></product-photos-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPhotosList from '@/features/admin/products/components/product-photos/ProductPhotosList.vue';
import ProductPhotosHeader from '@/features/admin/products/components/product-photos/ProductPhotosHeader.vue';
@Component({
  components: { ProductPhotosHeader, ProductPhotosList }
})
export default class ProductPhotosView extends Vue {}
</script>

<style scoped></style>
