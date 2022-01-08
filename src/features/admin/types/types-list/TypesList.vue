<template>
  <v-row>
    <v-col cols="12">
      <custom-simple-table>
        <template v-slot:search>
          <search-type></search-type>
        </template>
        <template v-slot:others>
          <div class="mt-6">
            <v-btn
              @click="() => modalFormTypeRef.open(null)"
              :disabled="initialLoading"
              color="primary"
              small
            >
              <v-icon left>mdi-plus-circle</v-icon> Agregar Tipo
            </v-btn>
          </div>
        </template>
        <template v-slot:body>
          <div>
            <types-table v-if="!initialLoading && !error.exist"></types-table>
            <custom-progress-circular
              v-if="initialLoading"
              class="d-flex align-center justify-center flex-column"
              style="height: 65vh"
            ></custom-progress-circular>
            <custom-message
              style="margin-top: 150px"
              v-if="searchMode && types.length === 0 && !initialLoading && !error.exist"
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
import TypesTable from '@/features/admin/types/types-table/TypesTable.vue';
import { namespace } from 'vuex-class';
import { TypeModel } from '@/app/models/type';
import { ErrorHandler } from '@/app/models/error';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';
import CustomMessage from '@/app/common/components/custom-messages/CustomMessage.vue';
import SearchType from '@/features/admin/types/components/search-type/SearchType.vue';
const type = namespace('type');
@Component({
  components: {
    SearchType,
    CustomMessage,
    CustomProgressCircular,
    TypesTable,
    CustomSimpleTable,
    CustomBodyTable
  }
})
export default class TypesList extends Vue {
  /******************* Start - Vuex *******************/
  @type.Getter
  types!: TypeModel[];
  @type.Getter
  searchMode!: boolean;
  @type.Getter
  initialLoading!: boolean;
  @type.Getter
  modalFormTypeRef!: any;
  @type.Getter
  error!: ErrorHandler;

  @type.Action
  loadTypes!: () => Promise<void>;
  @type.Action
  searchEnd!: () => void;
  /******************* End - Vuex *******************/
  created(): void {
    this.loadTypes();
  }
}
</script>

<style scoped></style>
