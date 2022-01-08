<template>
  <v-row v-if="pagination">
    <v-col cols="12">
      <template>
        <div class="text-center">
          <v-pagination
            :disabled="initialLoading"
            @input="onChangePaginate"
            :value="pagination.currentPage"
            :length="pagination.totalPages"
            :total-visible="9"
            circle
          ></v-pagination>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Pagination } from '@/app/models/pagination';
const category = namespace('category');
@Component
export default class CategoriesPaginate extends Vue {
  /******************* Start - Vuex *******************/
  @category.Getter
  initialLoading!: boolean;
  @category.Getter
  pagination!: Pagination | null;
  @category.Mutation
  setPaginate!: (number: number) => void;

  @category.Action
  loadCategories!: () => Promise<void>;
  /******************* End - Vuex *******************/
  onChangePaginate(val: number) {
    this.setPaginate(val);
    this.loadCategories();
  }
}
</script>

<style scoped></style>
