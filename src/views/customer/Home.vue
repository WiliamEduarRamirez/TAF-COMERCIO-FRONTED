<template>
  <home-component></home-component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/modules/customer/home/HomeComponent.vue';
import { namespace } from 'vuex-class';
import { Type } from '@/models/product';
import { PagingParams, PredicateParams } from '@/models/pagination';
const type = namespace('type');
const product = namespace('product');
@Component({
  components: { HomeComponent },
})
export default class Home extends Vue {
  @product.Action
  loadProducts!: () => Promise<void>;

  @product.Mutation
  setPredicate!: (predicateParams: PredicateParams) => void;
  @product.Mutation
  setPagingParams!: (pagingParams: PagingParams) => void;

  @type.Getter
  types!: Type[];

  @type.Action
  loadTypes!: () => Promise<void>;

  async created(): Promise<void> {
    const pagingParams = new PagingParams(1, 10);
    this.setPagingParams(pagingParams);
    await this.loadTypes();
    const predicateParams: PredicateParams = {
      predicate: 'isEnable',
      value: true,
    };
    this.setPredicate(predicateParams);
    await this.loadProducts();
  }
}
</script>

<style scoped></style>
