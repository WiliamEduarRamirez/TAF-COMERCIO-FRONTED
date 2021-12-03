<template>
  <div v-if="getPaginate" class="text-center">
    <v-pagination
      :value="getPaginate.currentPage"
      :length="getPaginate.totalPages"
      :disabled="getInitialLoading"
      @input="changePage"
      circle
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Pagination } from '@/models/pagination';
const product = namespace('product');
@Component
export default class ProductPaginate extends Vue {
  @product.Getter
  getPaginate!: Pagination | null;

  @product.Getter
  getInitialLoading!: boolean;

  @product.Action
  listProducts!: () => Promise<void>;

  @product.Mutation
  setPaginate!: (page: number) => void;

  async changePage(value: number): Promise<void> {
    this.setPaginate(value);
    await this.listProducts();
  }
}
</script>

<style scoped></style>
