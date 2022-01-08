<template>
  <div>
    <types-list></types-list>
    <types-paginate></types-paginate>
    <modal-form-type ref="modal-form-type"></modal-form-type>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TypesList from '@/features/admin/types/types-list/TypesList.vue';
import TypesPaginate from '@/features/admin/types/types-paginate/TypesPaginate.vue';
import ModalFormType from '@/features/admin/types/components/modals/modal-form-type/ModalFormType.vue';
import { namespace } from 'vuex-class';
import { TypeModel } from '@/app/models/type';
const type = namespace('type');
@Component({
  components: { ModalFormType, TypesPaginate, TypesList }
})
export default class TypesView extends Vue {
  @type.Mutation
  setModalFormType!: (modal: any) => void;
  @type.Mutation
  resetState!: () => void;

  mounted(): void {
    const modal = this.$refs['modal-form-type'] as Vue & {
      open: (type: TypeModel | null) => void;
    };
    this.setModalFormType(modal);
  }
  destroyed(): void {
    this.resetState();
  }
}
</script>

<style scoped></style>
