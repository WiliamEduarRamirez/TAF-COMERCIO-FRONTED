<template>
  <v-row justify="center">
    <v-dialog v-if="currentProduct" scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> Establecer foto principal </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            ¿Esta seguro que desea establecer esta foto como la principal?
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div style="width: 100%" class="text-center">
            <v-btn :disabled="loading" color="error" @click="close"> Cancelar </v-btn>
            <v-btn @click="setMain" class="ml-2" :loading="loading" color="success">
              Aceptar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Product } from '@/app/models/product';
import photosServices from '@/app/services/photos-services';
import { Photo } from '@/app/models/photo';
const product = namespace('product');

@Component
export default class ModalSetMainPhoto extends Vue {
  loading = false;
  dialog = false;
  photo: Photo | null = null;

  @product.Getter
  currentProduct!: Product | null;

  @product.Action
  loadCurrentProductPhotos!: (productId: string) => Promise<void>;

  open(photo: Photo): void {
    if (photo) {
      this.dialog = true;
      this.photo = photo;
    }
  }

  setMain(): void {
    if (!this.photo) return;
    if (!this.currentProduct) return;
    this.loading = true;
    photosServices
      .setMain(this.photo.id, this.currentProduct.id)
      .then(() => {
        this.$toast.success('Se cambio la foto principal correctamente');
        this.loadCurrentProductPhotos(this.currentProduct!.id);
        this.close();
      })
      .catch(() => {
        this.$toast.error('Ups, Ocurrio un error intente nuevamente');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  close(): void {
    this.dialog = false;
  }
}
</script>

<style scoped></style>
