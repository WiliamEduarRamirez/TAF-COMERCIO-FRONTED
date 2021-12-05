<template>
  <div>
    <div v-for="(tempItem, index) in shoppingCartItems" :key="index">
      <v-row class="my-1">
        <v-col cols="3">
          <div class="ml-4">
            <v-btn @click="() => increaseAmount(tempItem)" color="primary" x-small fab outlined>
              <v-icon> mdi-plus </v-icon>
            </v-btn>
            <h5 class="ml-3">
              {{ tempItem.amount }}
            </h5>
            <v-btn
              @click="() => decreaseAmount(tempItem)"
              :disabled="tempItem.amount === 1"
              color="primary"
              x-small
              fab
              outlined
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col class="d-flex justify-center align-center" cols="3">
          <v-img
            contain
            height="60"
            :src="tempItem.product.photoUrl || require('@/assets/images/unnamed.png')"
          >
          </v-img>
        </v-col>
        <v-col cols="4">
          <h5 class="text-truncate text-lowercase">
            {{ tempItem.product.denomination }}
          </h5>
          <p class="text-tiny mb-1">S/. {{ tempItem.product.price }} x {{ tempItem.amount }}</p>
          <h5 :style="{ color: $vuetify.theme.themes.dark.primary }">
            {{ formatDecimal(tempItem.product.price * tempItem.amount) }}
          </h5>
        </v-col>
        <v-col cols="2">
          <div class="mr-5 mt-4">
            <v-btn @click="deleteAmountItem(tempItem)" color="error" fab x-small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider :key="index"></v-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { CartItem } from '@/models/shopping-cart';
const shoppingCart = namespace('shoppingCart');
@Component
export default class DrawerRightContent extends Vue {
  @Prop({ required: true }) readonly handleDrawerRight!: () => void;
  @shoppingCart.Getter
  totalItems!: number;

  @shoppingCart.Getter
  shoppingCartItems!: CartItem[];

  @shoppingCart.Action
  increaseAmount!: (cartItem: CartItem) => void;

  @shoppingCart.Action
  decreaseAmount!: (cartItem: CartItem) => void;

  @shoppingCart.Mutation
  deleteAmountItem!: (cartItem: CartItem) => void;
}
</script>

<style scoped>
.text-tiny {
  font-size: 10px;
}
</style>
