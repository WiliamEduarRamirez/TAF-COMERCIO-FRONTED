<template>
  <v-card elevation="4" class="mx-auto my-12 rounded-xl" max-width="374">
    <v-img
      contain
      height="200"
      :src="product.photoUrl || require('@/app/assets/images/unnamed.png')"
    ></v-img>

    <v-card-title>{{ product.denomination }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
          class="mt-n1"
        ></v-rating>
        <div class="grey--text ms-4">
          {{ `${5} (${product.stock})` }}
        </div>
      </v-row>
      <p class="my-4 mb-0"><strong>Tipo:</strong> {{ product.type.denomination }}</p>
      <p class="mb-3"><strong>Categoria:</strong> {{ product.category.denomination }}</p>
      <!--      <div class="grey&#45;&#45;text">Plaza vea</div>-->
      <div class="my-3 d-flex">
        <h3 class="mr-2 mb-0" :style="{ color: $vuetify.theme.themes.dark.primary }">
          S/{{ formatDecimal(product.price) }}
        </h3>
        <h3 class="gray--text lighten-4 text-decoration-line-through mb-0">
          S/{{ formatDecimal(product.price + 16) }}
        </h3>
      </div>
      <div>
        {{ product.description }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <div style="width: 100%" class="text-center">
        <v-btn @click="addItemsOnStart(product)" color="primary" rounded> Agregar </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Product } from '@/app/models/product';
import { namespace } from 'vuex-class';

const shoppingCart = namespace('shoppingCart');

@Component
export default class CardProduct extends Vue {
  @Prop({ required: true }) readonly product!: Product;
  @shoppingCart.Action
  addItemsOnStart!: (product: Product) => void;
}
</script>

<style scoped></style>
