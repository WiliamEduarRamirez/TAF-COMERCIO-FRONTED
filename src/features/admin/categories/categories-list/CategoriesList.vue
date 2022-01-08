<template>
  <v-row>
    <v-col cols="12">
      <custom-simple-table>
        <template v-slot:search>
          <search-category></search-category>
        </template>
        <template v-slot:others>
          <div class="mt-6">
            <v-btn
              @click="() => modalFormCategoryRef.open(null)"
              :disabled="initialLoading"
              color="primary"
              small
            >
              <v-icon left>mdi-plus-circle</v-icon> Agregar Categoria
            </v-btn>
          </div>
        </template>
        <template v-slot:body>
          <div>
            <categories-table v-if="!initialLoading && !error.exist"></categories-table>
            <custom-progress-circular
              v-if="initialLoading"
              class="d-flex align-center justify-center flex-column"
              style="height: 65vh"
            ></custom-progress-circular>
            <custom-message
              style="margin-top: 150px"
              v-if="searchMode && categories.length === 0 && !initialLoading && !error.exist"
              message="No se encontraron resultados"
            >
              <v-btn color="primary" @click="searchEnd">Aceptar</v-btn>
            </custom-message>
            <custom-message
              style="margin-top: 150px"
              v-if="error.exist && !initialLoading"
              :message="error.message"
            >
              <v-btn color="primary" @click="searchEnd">Aceptar</v-btn>
            </custom-message>
          </div>
        </template>
      </custom-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomBodyTable from '@/app/common/components/custom-body-table/CustomBodyTable.vue';
import CustomSimpleTable from '@/app/common/components/custom-simple-table/CustomSimpleTable.vue';
import { namespace } from 'vuex-class';
import { ErrorHandler } from '@/app/models/error';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';
import CustomMessage from '@/app/common/components/custom-messages/CustomMessage.vue';
import { Category } from '@/app/models/category';
import SearchCategory from '@/features/admin/categories/components/search-category/SearchCategory.vue';
import CategoriesTable from '@/features/admin/categories/categories-table/CategoriesTable.vue';
const category = namespace('category');
@Component({
  components: {
    CategoriesTable,
    SearchCategory,
    CustomMessage,
    CustomSimpleTable,
    CustomBodyTable,
    CustomProgressCircular
  }
})
export default class CategoriesList extends Vue {
  /******************* Start - Vuex *******************/
  @category.Getter
  categories!: Category[];
  @category.Getter
  searchMode!: boolean;
  @category.Getter
  initialLoading!: boolean;
  @category.Getter
  modalFormCategoryRef!: any;
  @category.Getter
  error!: ErrorHandler;

  @category.Mutation
  setTypeIdParam!: (typeId: string) => void;

  @category.Action
  loadCategories!: () => Promise<void>;
  @category.Action
  searchEnd!: () => void;
  /******************* End - Vuex *******************/
  created(): void {
    if (!this.$route.params.id) return;
    this.setTypeIdParam(this.$route.params.id);
    this.loadCategories();
  }
}
</script>

<style scoped></style>
