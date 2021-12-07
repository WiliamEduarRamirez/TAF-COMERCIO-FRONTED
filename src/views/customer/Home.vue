<template>
  <div>
    <home-component v-if="!loading"></home-component>
    <v-dialog v-model="loading" persistent width="450">
      <v-card>
        <v-card-text>
          <div class="text-subtitle-1 text-center">Cargando Productos...</div>
          <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
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
  loading = false;
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
    if (this.types.length === 0) {
      this.loading = true;
      const pagingParams = new PagingParams(1, 10);
      this.setPagingParams(pagingParams);
      await this.loadTypes();
      const predicateParams: PredicateParams = {
        predicate: 'isEnable',
        value: true,
      };
      this.setPredicate(predicateParams);
      await this.loadProducts();
      this.loading = false;
    }
  }
}
</script>

<style scoped></style>
