<template>
  <v-row>
    <modal-form-product @successful="successfulAdd" ref="modal-form-product"></modal-form-product>
    <custom-modal
      @on-accept-event="productAddedSuccessful"
      ref="custom-modal-successful"
      message="El producto se agrego correctamente. ¿Desea agregar una imagen?"
      title="Agregar imagen"
    ></custom-modal>
    <v-col class="d-flex justify-end" cols="12">
      <v-btn @click="openModalFormProduct" color="success" small class="mr-3">
        Agregar Producto
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModalFormProduct from '@/modules/admin/products/modals/ModalFormProduct.vue';
import { Product } from '@/models/product';
import CustomModal from '@/common/custom-modal/CustomModal.vue';
import { namespace } from 'vuex-class';
const product = namespace('product');
@Component({
  components: { CustomModal, ModalFormProduct },
})
export default class ProductHeader extends Vue {
  product: Product | null = null;

  /*  @Emit('product-added-successful')
  productAddedSuccessful(): string | null {
    return this.product;
  }*/

  @product.Action
  listProducts!: () => Promise<void>;

  @product.Getter
  modalAddPhotoRef!: any;

  productAddedSuccessful(): void {
    this.modalAddPhotoRef.open(this.product);
  }

  openModalFormProduct(product: Product | null): void {
    const modal = this.$refs['modal-form-product'] as Vue & {
      open: (product: Product | null) => void;
    };
    modal.open(product);
  }

  successfulAdd(product: Product): void {
    this.product = product;
    this.listProducts();
    const modal = this.$refs['custom-modal-successful'] as Vue & {
      open: () => void;
    };
    modal.open();
  }
}
</script>

<style scoped></style>
