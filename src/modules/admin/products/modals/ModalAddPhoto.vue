<template>
  <v-row justify="center">
    <v-dialog v-if="product" scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> Agregar Imagen al producto {{ product.denomination }} </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <custom-dropzone
                  ref="custom-dropzone-product"
                  @remove="deleteFile"
                  @input-file="inputFile"
                ></custom-dropzone>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" color="error" @click="close"> Cancelar </v-btn>
          <v-btn
            @click="uploadPhoto"
            class="ma-2"
            :disabled="!file"
            :loading="loading"
            color="success"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Product } from '@/models/product';
import CustomDropzone from '@/common/custom-dropzone/CustomDropzone.vue';
import photosServices from '@/services/photos-services';
@Component({
  components: { CustomDropzone },
})
export default class ProductsList extends Vue {
  loading = false;
  valid = true;
  dialog = false;
  product: Product | null = null;
  file: File | null = null;

  open(product: Product): void {
    if (product) {
      this.dialog = true;
      this.product = product;
    }
  }

  close(): void {
    this.dialog = false;
  }

  inputFile(file: File): void {
    this.file = file;
  }

  deleteFile(): void {
    this.file = null;
  }

  async uploadPhoto(): Promise<void> {
    this.loading = true;
    try {
      if (this.file && this.product) {
        const dropzone = this.$refs['custom-dropzone-product'] as Vue & {
          resetValues: () => void;
        };
        await photosServices.add(this.file, this.product.id);
        this.$toast.success('La foto se agrego correctamente');
        this.close();
        dropzone.resetValues();
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped></style>
