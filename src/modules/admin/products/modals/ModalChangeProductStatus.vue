<template>
  <v-row justify="center">
    <v-dialog v-if="product" scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong>
              {{ !product.state ? 'Habilitar' : 'Deshabilitar' }} producto
              {{ product.denomination }}
            </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            ¿Esta seguro que desea {{ !product.state ? 'Habilitar' : 'Deshabilitar' }} el producto
            {{ product.denomination }}?
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div style="width: 100%" class="text-center">
            <v-btn :disabled="loading" color="error" @click="close"> Cancelar </v-btn>
            <v-btn @click="changeStatus" class="ml-2" :loading="loading" color="success">
              Aceptar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import productsServices from '@/services/products.services';
import { Product } from '@/models/product';

@Component
export default class ModalChangeProductStatus extends Vue {
  dialog = true;
  product: Product | null = null;
  loading = false;

  @Emit('successful')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  successful(): void {}

  open(product: Product): void {
    this.product = product;
    this.dialog = true;
  }
  close(): void {
    this.loading = false;
    this.product = null;
    this.dialog = false;
  }
  changeStatus(): void {
    if (this.product) {
      this.loading = true;
      const state = !this.product!.state;
      productsServices.changeStatus(this.product.id, state).then(() => {
        this.$toast.success(`El producto se ${state ? 'Habilito' : 'Deshabilito'} correctamente`);
        this.successful();
        this.close();
      });
    }
  }
}
</script>

<style scoped></style>
