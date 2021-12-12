<template>
  <v-row>
    <modal-add-photo
      @successful="loadCurrentProductPhotos($route.params.id)"
      ref="modal-add-photo"
    ></modal-add-photo>
    <v-col cols="12">
      <v-btn @click="redirectProducts" small color="primary">
        <v-icon left>mdi-arrow-left</v-icon>
        Regresar
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-alert dense text type="info">
        Fotos del producto {{ currentProduct.denomination }} -
        <strong> 6/{{ currentProductPhotos.length }} </strong>
      </v-alert>
    </v-col>
    <v-col class="d-flex justify-end" cols="6">
      <v-btn @click="openModalAddPhoto" color="info" small>
        <v-icon left>mdi-plus-circle</v-icon> Agregar Foto
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Product } from '@/app/models/product';
import ModalAddPhoto from '@/features/admin/products/modals/ModalAddPhoto.vue';
import { Photo } from '@/app/models/photo';
const product = namespace('product');
@Component({
  components: { ModalAddPhoto }
})
export default class ProductPhotosHeader extends Vue {
  @product.Getter
  currentProduct!: Product | null;
  @product.Getter
  currentProductPhotos!: Photo[];

  @product.Action
  loadCurrentProductPhotos!: (productId: string) => Promise<void>;

  openModalAddPhoto(): void {
    const modal = this.$refs['modal-add-photo'] as Vue & {
      open: (product: Product | null) => void;
    };
    modal.open(this.currentProduct);
  }
  redirectProducts(): void {
    this.$router.push({ name: 'products' });
  }
}
</script>

<style scoped></style>
