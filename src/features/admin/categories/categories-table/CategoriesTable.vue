<template>
  <div>
    <v-simple-table v-if="categories.length > 0" fixed-header height="450px">
      <template v-slot:default>
        <thead>
          <tr>
            <th scope="col" class="text-center">Creación</th>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Descripción</th>
            <th scope="col" class="text-center">Estado</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tempCategory in categories" :key="tempCategory.id">
            <td class="text-center">
              {{ formatDateLocal(tempCategory.createdAt) }}
            </td>
            <td class="text-center" style="min-width: 150px">
              {{ isNull(tempCategory.denomination) }}
            </td>
            <td class="text-center" style="min-width: 200px">
              {{ isNull(tempCategory.description) }}
            </td>
            <td class="text-center">
              <v-btn :color="tempCategory.state ? 'success' : 'error'" x-small>
                {{ tempCategory.state ? 'Habilitado' : 'Deshabilitado' }}
              </v-btn>
            </td>
            <td style="min-width: 150px" class="text-center">
              <div style="width: 100%" class="text-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <v-btn @click="openModalFormCategory(tempCategory)" small icon>
                        <v-icon color="warning">mdi-pencil</v-icon>
                      </v-btn>
                    </span>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <v-btn
                        @click="openModalChangeStatus(tempCategory)"
                        small
                        icon
                        :color="!tempCategory.state ? 'success' : 'error'"
                      >
                        <v-icon>
                          {{
                            tempCategory.state
                              ? 'mdi-close-circle-outline'
                              : 'mdi-checkbox-marked-circle-outline'
                          }}
                        </v-icon>
                      </v-btn>
                    </span>
                  </template>
                  <span>{{ tempCategory.state ? 'Deshabilitar' : 'Habilitar' }}</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      v-if="categories.length === 0 && !searchMode"
      class="d-flex align-center justify-center flex-column"
      style="height: 65vh"
    >
      <custom-message message="No dispone de ninguna categoria en este momento"></custom-message>
    </div>
    <!--    <custom-modal-change-status
      @action-modal="changeStatus"
      ref="custom-modal-change-status"
    ></custom-modal-change-status>-->
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CustomMessage from '@/app/common/components/custom-messages/CustomMessage.vue';
import FormatMixin from '@/app/common/mixins/formatMixin';
import { Category } from '@/app/models/category';
const category = namespace('category');
@Component({
  components: { CustomMessage }
})
export default class CategoriesTable extends Mixins(FormatMixin) {
  category: Category | null = null;
  modalChangeStatusRef: any = null;
  /******************* Start - Vuex *******************/
  @category.Getter
  categories!: Category[];
  @category.Getter
  modalFormCategoryRef!: any;
  @category.Getter
  searchMode!: boolean;

  @category.Action
  loadCategories!: () => Promise<void>;
  /******************* End - Vuex *******************/
  openModalFormCategory(category: Category) {
    this.modalFormCategoryRef.open(category);
  }

  openModalChangeStatus(category: Category): void {
    this.modalChangeStatusRef = this.$refs['custom-modal-change-status'] as Vue & {
      open: (value: string, name: string, status: boolean) => void;
      close: () => void;
      setLoading: (value: boolean) => void;
    };
    this.category = category;
    this.modalChangeStatusRef.open('el tipo', category.denomination, category.state);
  }

  /*  changeStatus(): void {
    if (this.type) {
      const status = !this.type.status;
      typesServices
        .changeStatus(this.type._id, status)
        .then(() => {
          this.$toast.success(`El Tipo se ${status ? 'Habilito' : 'Deshabilito'} correctamente`);
          this.modalChangeStatusRef.close();
          this.type = null;
          this.modalChangeStatusRef = null;
          this.loadCategories();
        })
        .catch(err => {
          this.modalChangeStatusRef.setLoading(false);
          if (err.response?.status === 400) {
            this.openModalError(err.response);
            return;
          }
          this.$toast.error('Ups, Ocurrió un error, intente nuevamente');
        });
    }
  }*/
}
</script>

<style scoped></style>
