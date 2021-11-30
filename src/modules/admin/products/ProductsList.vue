<template>
  <div>Desde products admin</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Pagination, PagingParams } from '@/models/pagination';
import productsServices from '@/services/products.services';
import { Product } from '@/models/product';

@Component
export default class ProductsList extends Vue {
  pagination: Pagination | null = null;
  pagingParams = new PagingParams(1, 10);
  products: Product[] = [];
  initialLoading = false;

  get axiosParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    return params;
  }

  async created(): Promise<void> {
    this.initialLoading = true;
    try {
      const result = await productsServices.list(this.axiosParams);
      this.products = result.data;
      this.pagination = result.pagination;
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      this.initialLoading = true;
    }
  }
}
</script>

<style scoped></style>
