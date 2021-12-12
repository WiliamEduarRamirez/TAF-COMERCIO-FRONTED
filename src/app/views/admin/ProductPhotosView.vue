<template>
  <v-container>
    <div v-if="!loadingProduct">
      <product-photos-header></product-photos-header>
      <product-photos-list></product-photos-list>
    </div>
    <v-row v-else>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center" style="height: 80vh">
          <custom-progress-circular></custom-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductPhotosList from '@/features/admin/products/components/product-photos/ProductPhotosList.vue';
import ProductPhotosHeader from '@/features/admin/products/components/product-photos/ProductPhotosHeader.vue';
import { namespace } from 'vuex-class';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';
import { Photo } from '@/app/models/photo';
const product = namespace('product');
@Component({
  components: { CustomProgressCircular, ProductPhotosHeader, ProductPhotosList }
})
export default class ProductPhotosView extends Vue {
  @product.Action
  loadCurrentProduct!: (productId: string) => Promise<void>;
  @product.Getter
  loadingProduct!: boolean;

  @product.Mutation
  setCurrentProductPhotos!: (photos: Photo[]) => void;

  destroyed(): void {
    this.setCurrentProductPhotos([]);
  }

  created(): void {
    const productId = this.$route.params.id;
    if (productId) {
      this.loadCurrentProduct(productId);
    }
  }
}
</script>

<style scoped></style>
