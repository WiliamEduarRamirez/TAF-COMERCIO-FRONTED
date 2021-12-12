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
      <v-btn
        :disabled="getInitialLoading"
        @click="openModalFormProduct"
        color="success"
        small
        class="mr-3"
      >
        <v-icon left>mdi-plus-circle</v-icon>
        Agregar Producto
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModalFormProduct from '@/features/admin/products/modals/ModalFormProduct.vue';
import { Product } from '@/app/models/product';
import CustomModal from '@/common/custom-modal/CustomModal.vue';
import { namespace } from 'vuex-class';
const product = namespace('product');
@Component({
  components: { CustomModal, ModalFormProduct },
})
export default class ProductHeader extends Vue {
  product: Product | null = null;

  @product.Getter
  getInitialLoading!: boolean;

  @product.Action
  loadProducts!: () => Promise<void>;

  @product.Getter
  modalAddPhotoRef!: any;

  @product.Mutation
  setModalFromProductRef!: (modalRef: any) => void;

  mounted(): void {
    const modal = this.$refs['modal-form-product'] as Vue & {
      open: (product: Product | null) => void;
    };
    this.setModalFromProductRef(modal);
  }

  destroyed(): void {
    this.setModalFromProductRef(null);
  }

  productAddedSuccessful(): void {
    this.modalAddPhotoRef.open(this.product);
  }

  openModalFormProduct(): void {
    const modal = this.$refs['modal-form-product'] as Vue & {
      open: (product: Product | null) => void;
    };
    modal.open(null);
  }

  successfulAdd(product: Product | null): void {
    this.product = product;
    this.loadProducts();
    if (product) {
      const modal = this.$refs['custom-modal-successful'] as Vue & {
        open: () => void;
      };
      modal.open();
    }
  }
}
</script>

<style scoped></style>
