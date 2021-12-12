<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col> Fotos del producto {{ currentProduct.denomination }} </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row v-if="!loadingProductPhotos">
            <template v-if="currentProductPhotos.length > 0">
              <v-col
                v-for="tempPhoto in currentProductPhotos"
                :key="tempPhoto.id"
                cols="6"
                sm="4"
                md="3"
              >
                <v-card>
                  <v-img contain height="200" :src="tempPhoto.url">
                    <v-icon class="mt-5 ml-5" large :color="tempPhoto.isMain ? 'warning' : ''">
                      mdi-star
                    </v-icon>
                    <div
                      class="d-flex flex-row justify-center align-center"
                      style="margin-top: 100px; margin-left: 130px"
                    >
                      <v-btn :disabled="tempPhoto.isMain" x-small color="success" fab>
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn :disabled="tempPhoto.isMain" x-small color="error" class="ml-3" fab>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </v-col>
            </template>
            <v-col cols="12" v-else>
              <h3>
                El producto {{ currentProduct.denomination }} no dispone de ninguna foto asignada,
                por favor agregue una
              </h3>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <div class="d-flex flex-column justify-center align-center" style="height: 30vh">
                <custom-progress-circular></custom-progress-circular>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Product } from '@/app/models/product';
import { Photo } from '@/app/models/photo';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';
const product = namespace('product');
@Component({
  components: { CustomProgressCircular }
})
export default class ProductPhotosList extends Vue {
  @product.Getter
  currentProduct!: Product | null;

  @product.Getter
  loadingProductPhotos!: boolean;

  @product.Getter
  currentProductPhotos!: Photo[];

  @product.Action
  loadCurrentProductPhotos!: (productId: string) => Promise<void>;

  mounted(): void {
    const productId = this.$route.params.id;
    if (productId) {
      this.loadCurrentProductPhotos(productId);
    }
  }
}
</script>

<style scoped></style>
