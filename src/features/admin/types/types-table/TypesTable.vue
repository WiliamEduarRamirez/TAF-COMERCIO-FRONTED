<template>
  <div>
    <v-simple-table v-if="types.length > 0" fixed-header height="450px">
      <template v-slot:default>
        <thead>
          <tr>
            <th scope="col" class="text-center">Creación</th>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Estado</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tempType in types" :key="tempType._id">
            <td class="text-center">
              {{ formatDateLocal(tempType.createdAt) }}
            </td>
            <td class="text-center" style="min-width: 150px">
              {{ isNull(tempType.denomination) }}
            </td>
            <td class="text-center">
              <v-btn :color="tempType.state ? 'success' : 'error'" x-small>
                {{ tempType.state ? 'Habilitado' : 'Deshabilitado' }}
              </v-btn>
            </td>
            <td style="min-width: 150px" class="text-center">
              <div style="width: 100%" class="text-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <v-btn @click="openModalFormType(tempType)" small icon>
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
                        @click="openModalChangeStatus(tempType)"
                        small
                        icon
                        :color="!tempType.state ? 'success' : 'error'"
                      >
                        <v-icon>
                          {{
                            tempType.state
                              ? 'mdi-close-circle-outline'
                              : 'mdi-checkbox-marked-circle-outline'
                          }}
                        </v-icon>
                      </v-btn>
                    </span>
                  </template>
                  <span>{{ tempType.state ? 'Deshabilitar' : 'Habilitar' }}</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      v-if="types.length === 0 && !searchMode"
      class="d-flex align-center justify-center flex-column"
      style="height: 65vh"
    >
      <custom-message message="No dispone de ningún tipo en este momento"></custom-message>
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
import { TypeModel } from '@/app/models/type';
import CustomMessage from '@/app/common/components/custom-messages/CustomMessage.vue';
import FormatMixin from '@/app/common/mixins/formatMixin';
const type = namespace('type');
@Component({
  components: { CustomMessage }
})
export default class TypesTable extends Mixins(FormatMixin) {
  type: TypeModel | null = null;
  modalChangeStatusRef: any = null;
  /******************* Start - Vuex *******************/
  @type.Getter
  types!: TypeModel[];
  @type.Getter
  modalFormTypeRef!: any;
  @type.Getter
  searchMode!: boolean;

  @type.Action
  loadTypes!: () => Promise<void>;
  /******************* End - Vuex *******************/
  openModalFormType(type: TypeModel) {
    this.modalFormTypeRef.open(type);
  }

  openModalChangeStatus(type: TypeModel): void {
    this.modalChangeStatusRef = this.$refs['custom-modal-change-status'] as Vue & {
      open: (value: string, name: string, status: boolean) => void;
      close: () => void;
      setLoading: (value: boolean) => void;
    };
    this.type = type;
    this.modalChangeStatusRef.open('el tipo', type.denomination, type.state);
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
          this.loadTypes();
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
