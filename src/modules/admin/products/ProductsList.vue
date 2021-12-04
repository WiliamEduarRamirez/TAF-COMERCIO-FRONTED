<template>
  <v-row>
    <v-col cols="12">
      <products-table> </products-table>
    </v-col>
    <v-col cols="12">
      <product-paginate></product-paginate>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const product = namespace('product');
import ProductsTable from '@/modules/admin/products/ProductsTable.vue';
import ProductPaginate from '@/modules/admin/products/ProductPaginate.vue';
@Component({
  components: { ProductPaginate, ProductsTable },
})
export default class ProductsList extends Vue {
  @product.Action
  loadProducts!: () => Promise<void>;
  async created(): Promise<void> {
    await this.loadProducts();
  }
}
</script>

<style scoped></style>
