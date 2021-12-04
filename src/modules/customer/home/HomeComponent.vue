<template>
  <v-container>
    <v-row>
      <!--      <template v-for="n in 4">
        <v-col :key="n" class="mt-2" cols="12">
          <strong>Category {{ n }}</strong>
        </v-col>
      </template>-->
      <v-col v-for="tempProduct in products" :key="tempProduct.id" cols="12" sm="6" md="4">
        <card-product :product="tempProduct"></card-product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Product } from '@/models/product';
import CardProduct from '@/modules/customer/home/CardProduct.vue';
const product = namespace('product');
@Component({
  components: { CardProduct },
})
export default class HomeComponent extends Vue {
  @product.Getter
  products!: Product[];
}
</script>

<style scoped></style>
