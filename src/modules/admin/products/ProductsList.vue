<template>
  <div>
    <products-table> </products-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const product = namespace('product');
import ProductsTable from '@/modules/admin/products/ProductsTable.vue';
@Component({
  components: { ProductsTable },
})
export default class ProductsList extends Vue {
  @product.Action
  listProducts!: () => Promise<void>;
  async created(): Promise<void> {
    await this.listProducts();
  }
}
</script>

<style scoped></style>
