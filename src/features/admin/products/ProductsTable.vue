<template>
  <div>
    <modal-add-photo ref="modal-add-photo"></modal-add-photo>
    <modal-change-product-status
      @successful="loadProducts"
      ref="modal-change-product-status"
    ></modal-change-product-status>
    <CustomBodyTable title="Productos">
      <template>
        <v-simple-table v-if="!getInitialLoading" fixed-header height="360px">
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
                <th scope="col" class="text-center">ESTADO</th>
                <th scope="col" class="text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tempProduct, index) in products" :key="index">
                <td class="text-center" style="min-width: 140px">{{ tempProduct.code }}</td>
                <td class="text-center">{{ formatDateLocal(tempProduct.createdAt) }}</td>
                <td class="text-center" style="min-width: 150px">{{ tempProduct.denomination }}</td>
                <td class="text-center">{{ tempProduct.price }}</td>
                <td class="text-center">{{ tempProduct.cost }}</td>
                <td class="text-center">{{ tempProduct.type.denomination }}</td>
                <td class="text-center">{{ tempProduct.category.denomination }}</td>
                <td class="text-center">{{ tempProduct.stock }}</td>
                <td class="text-center" style="width: 120px">
                  <v-chip :color="tempProduct.state ? 'success' : 'error'" small>
                    {{ tempProduct.state ? 'Habilitado' : 'Deshabilitado' }}
                  </v-chip>
                </td>
                <td class="text-center" style="min-width: 120px">
                  <v-row>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn color="primary" @click="() => redirectPhotos(tempProduct)" icon>
                            <v-icon>mdi-image-multiple</v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <span>Fotos</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn
                            color="warning"
                            @click="() => openModalFormProduct(tempProduct)"
                            icon
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn
                            :color="!tempProduct.state ? 'success' : 'error'"
                            @click="() => openModalChangeProductStatus(tempProduct)"
                            icon
                          >
                            <v-icon>
                              {{
                                tempProduct.state
                                  ? 'mdi-close-circle-outline'
                                  : 'mdi-checkbox-marked-circle-outline'
                              }}
                            </v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <span>{{ tempProduct.state ? 'Deshabilitar' : 'Habilitar' }}</span>
                    </v-tooltip>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="text-center" style="margin-top: 200px" v-else>
          <custom-progress-circular></custom-progress-circular>
        </div>
        <custom-message
          style="margin-top: -250px"
          v-if="products.length === 0 && !getInitialLoading"
          message="No disponde de ningun producto en este momento"
        ></custom-message>
      </template>
    </CustomBodyTable>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import CustomBodyTable from '@/app/common/components/custom-body-table/CustomBodyTable.vue';
import { Product } from '@/app/models/product';
import { namespace } from 'vuex-class';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';
import ModalAddPhoto from '@/features/admin/products/modals/ModalAddPhoto.vue';
import CustomMessage from '@/app/common/components/custom-messages/CustomMessage.vue';
import ModalChangeProductStatus from '@/features/admin/products/modals/ModalChangeProductStatus.vue';
import FormatMixin from '@/app/common/mixins/formatMixin';
const product = namespace('product');
@Component({
  components: {
    ModalChangeProductStatus,
    CustomMessage,
    ModalAddPhoto,
    CustomProgressCircular,
    CustomBodyTable
  }
})
export default class ProductsList extends Mixins(FormatMixin) {
  @product.Getter
  getInitialLoading!: boolean;

  @product.Getter
  products!: Product[];

  @product.Getter
  modalFromProductRef!: any;

  @product.Mutation
  setModalAddPhotoRef!: (modalRef: any) => void;

  @product.Action
  loadProducts!: () => Promise<void>;

  mounted(): void {
    const modal = this.$refs['modal-add-photo'] as Vue & { open: (product: Product) => void };
    this.setModalAddPhotoRef(modal);
  }

  destroyed(): any {
    this.setModalAddPhotoRef(null);
  }

  openModalFormProduct(product: Product): void {
    this.modalFromProductRef.open(product);
  }

  openModalAddPhoto(product: Product): void {
    const modal = this.$refs['modal-add-photo'] as Vue & { open: (product: Product) => void };
    modal.open(product);
  }

  redirectPhotos(product: Product): void {
    this.$router.push({ path: `/admin/products/${product.id}/photos` });
  }

  openModalChangeProductStatus(product: Product): void {
    const modal = this.$refs['modal-change-product-status'] as Vue & {
      open: (product: Product) => void;
    };
    modal.open(product);
  }
}
</script>

<style scoped></style>
