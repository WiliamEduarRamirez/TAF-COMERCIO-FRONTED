<template>
  <div>
    <modal-add-photo ref="modal-add-photo"></modal-add-photo>
    <CustomBodyTable title="Productos">
      <template>
        <v-simple-table v-if="!getInitialLoading" fixed-header height="450px">
          <template v-slot:default>
            <thead>
              <tr>
                <th scope="col" class="text-center">CÓD.</th>
                <th scope="col" class="text-center">CREADO</th>
                <th scope="col" class="text-center">NOMBRE</th>
                <th scope="col" class="text-center">PRECIO</th>
                <th scope="col" class="text-center">COSTO</th>
                <th scope="col" class="text-center">TIPO</th>
                <th scope="col" class="text-center">CATEGORIA</th>
                <th scope="col" class="text-center">STOCK</th>
                <th scope="col" class="text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tempProduct, index) in getProducts" :key="index">
                <td class="text-center">{{ tempProduct.code }}</td>
                <td class="text-center">{{ formatDateLocal(tempProduct.createdAt) }}</td>
                <td class="text-center">{{ tempProduct.denomination }}</td>
                <td class="text-center">{{ tempProduct.price }}</td>
                <td class="text-center">{{ tempProduct.cost }}</td>
                <td class="text-center">{{ tempProduct.type.denomination }}</td>
                <td class="text-center">{{ tempProduct.category.denomination }}</td>
                <td class="text-center">{{ tempProduct.stock }}</td>
                <td class="text-center">
                  <div style="width: 100%" class="text-center">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn @click="() => openModalAddPhoto(tempProduct)" icon>
                            <v-icon>mdi-alert-circle-outline</v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <span>Agregar Foto</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="text-center" style="margin-top: 220px" v-else>
          <custom-progress-circular></custom-progress-circular>
        </div>
        <custom-message
          style="margin-top: -250px"
          v-if="getProducts.length === 0 && !getInitialLoading"
          message="No disponde de ningun producto en este momento"
        ></custom-message>
      </template>
    </CustomBodyTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomBodyTable from '@/common/custom-body-table/CustomBodyTable.vue';
import { Product } from '@/models/product';
import { namespace } from 'vuex-class';
import CustomProgressCircular from '@/common/custom-progress-circular/CustomProgressCircular.vue';
import ModalAddPhoto from '@/modules/admin/products/modals/ModalAddPhoto.vue';
import CustomMessage from '@/common/custom-messages/CustomMessage.vue';
const product = namespace('product');
@Component({
  components: { CustomMessage, ModalAddPhoto, CustomProgressCircular, CustomBodyTable },
})
export default class ProductsList extends Vue {
  @product.Getter
  getInitialLoading!: boolean;

  @product.Getter
  getProducts!: Product[];

  @product.Mutation
  setModalAddPhotoRef!: (modalRef: any) => void;

  mounted(): void {
    const modal = this.$refs['modal-add-photo'] as Vue & { open: (product: Product) => void };
    this.setModalAddPhotoRef(modal);
  }

  openModalAddPhoto(product: Product): void {
    const modal = this.$refs['modal-add-photo'] as Vue & { open: (product: Product) => void };
    modal.open(product);
  }
}
</script>

<style scoped></style>
