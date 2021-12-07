<template>
  <v-row>
    <v-col class="mt-3" v-if="$vuetify.breakpoint.mdAndUp" cols="2">
      <home-types-list></home-types-list>
    </v-col>
    <v-col class="mt-n12">
      <v-container fluid>
        <v-row>
          <v-col v-for="tempProduct in products" :key="tempProduct.id" cols="12" sm="6" md="4">
            <card-product :product="tempProduct"></card-product>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Product } from '@/models/product';
import CardProduct from '@/modules/customer/home/CardProduct.vue';
import HomeTypesList from './HomeTypesList.vue';

const product = namespace('product');
@Component({
  components: { HomeTypesList, CardProduct },
})
export default class HomeComponent extends Vue {
  @product.Getter
  products!: Product[];
}
</script>

<style scoped></style>
