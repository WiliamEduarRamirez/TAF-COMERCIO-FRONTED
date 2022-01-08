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
const type = namespace('type');
@Component
export default class TypesPaginate extends Vue {
  /******************* Start - Vuex *******************/
  @type.Getter
  initialLoading!: boolean;
  @type.Getter
  pagination!: Pagination | null;
  @type.Mutation
  setPaginate!: (number: number) => void;

  @type.Action
  loadTypes!: () => Promise<void>;
  /******************* End - Vuex *******************/
  onChangePaginate(val: number) {
    this.setPaginate(val);
    this.loadTypes();
  }
}
</script>

<style scoped></style>
