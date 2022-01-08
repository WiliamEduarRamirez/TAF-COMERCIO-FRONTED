<template>
  <div>
    <categories-header></categories-header>
    <categories-list></categories-list>
    <categories-paginate></categories-paginate>
    <modal-form-category ref="modal-form-category"></modal-form-category>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Category } from '@/app/models/category';
import CategoriesList from '@/features/admin/categories/categories-list/CategoriesList.vue';
import CategoriesPaginate from '@/features/admin/categories/categories-paginate/CategoriesPaginate.vue';
import ModalFormCategory from '@/features/admin/categories/components/modals/modal-form-category/ModalFormCategory.vue';
import CategoriesHeader from '@/features/admin/categories/categories-header/CategoriesHeader.vue';
const category = namespace('category');
@Component({
  components: { CategoriesHeader, ModalFormCategory, CategoriesPaginate, CategoriesList }
})
export default class CategoriesView extends Vue {
  @category.Mutation
  setModalFormCategory!: (modal: any) => void;
  @category.Mutation
  resetState!: () => void;

  mounted(): void {
    const modal = this.$refs['modal-form-category'] as Vue & {
      open: (type: Category | null) => void;
    };
    this.setModalFormCategory(modal);
  }
  destroyed(): void {
    this.resetState();
  }
}
</script>

<style scoped></style>
