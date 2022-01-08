<template>
  <v-row justify="center">
    <v-dialog scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> {{ !editMode ? 'AGREGAR PRODUCTO' : 'EDITAR PRODUCTO' }} </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :disabled="loading"
                  label="Codigo*"
                  required
                  :rules="[globalRules.required]"
                  v-model.trim="productFormValues.code"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :disabled="loading"
                  label="Nombre*"
                  required
                  :rules="[globalRules.required]"
                  v-model.trim="productFormValues.denomination"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :disabled="loading"
                  label="Descripcion*"
                  required
                  :rules="[globalRules.required]"
                  v-model.trim="productFormValues.description"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :disabled="loading"
                  label="Costo*"
                  required
                  :rules="[globalRules.required, globalRules.validDecimalNumbers]"
                  v-model.number="productFormValues.cost"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :disabled="loading"
                  label="Precio*"
                  required
                  :rules="[globalRules.required, globalRules.validDecimalNumbers]"
                  v-model.number="productFormValues.price"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :disabled="loading"
                  label="Stock*"
                  required
                  :rules="[globalRules.required, globalRules.validNumbers]"
                  v-model.number="productFormValues.stock"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  @change="onChangeType"
                  :disabled="loadingTypes || loading"
                  :loading="loadingTypes"
                  v-model.trim="productFormValues.typeId"
                  :items="typesItems"
                  label="Tipo*"
                  required
                  :rules="[globalRules.required]"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  :disabled="loadingCategories || loading || productFormValues.typeId === ''"
                  :loading="loadingCategories"
                  v-model.trim="productFormValues.categoryId"
                  :items="categoriesItems"
                  label="Categoria*"
                  required
                  :rules="[globalRules.required]"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" :disabled="loading" @click="close"> Cancelar </v-btn>
          <v-btn
            @click="modalAction"
            class="ma-2"
            :disabled="!valid || loadingTypes || loadingCategories"
            :loading="loading"
            :color="editMode ? 'primary' : 'success'"
          >
            {{ editMode ? 'Editar' : 'Agregar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Vue } from 'vue-property-decorator';
import CustomDropzone from '@/app/common/components/custom-dropzone/CustomDropzone.vue';
import { Product, ProductFormValues } from '@/app/models/product';
import categoriesServices from '@/app/services/categories.services';
import typesServices from '@/app/services/types.services';
import productsServices from '@/app/services/products.services';
import { PagingParams } from '@/app/models/pagination';
import FormValidationMixin from '@/app/common/mixins/formValidationMixin';

interface Item {
  text: string;
  value: string;
}

@Component({
  components: { CustomDropzone }
})
export default class ProductsList extends Mixins(FormValidationMixin) {
  loading = false;
  valid = true;
  dialog = false;
  editMode = false;
  categoriesItems: Item[] = [];
  loadingCategories = false;
  typesItems: Item[] = [];
  loadingTypes = false;
  productFormValues = new ProductFormValues();

  @Emit('successful')
  successful(product: Product | null): Product | null {
    return product;
  }

  open(product: Product | null): void {
    this.dialog = true;
    this.editMode = !!product;
    this.listTypes();
    if (this.editMode && product) {
      const productForm = {
        ...this.productFormValues,
        ...product,
        categoryId: product.category.id,
        typeId: product.type.id
      };
      this.productFormValues = new ProductFormValues(productForm as ProductFormValues);
      this.listCategories(this.productFormValues.typeId);
    }
  }

  modalAction(): void {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    if (!form.validate()) return;
    this.loading = true;
    if (!this.editMode) {
      this.addProduct();
    } else {
      this.editProduct();
    }
  }

  addProduct(): void {
    /*delete this.productFormValues.state;*/
    productsServices.add(this.productFormValues).then(res => {
      this.loading = false;
      this.$toast.success('Producto agregado correctamente');
      this.successful(res);
      this.close();
    });
  }

  onChangeType(): void {
    this.categoriesItems = [];
    this.productFormValues.categoryId = '';
    this.listCategories(this.productFormValues.typeId);
  }

  editProduct(): void {
    productsServices.edit(this.productFormValues).then(() => {
      this.loading = false;
      this.$toast.success('Producto editado correctamente');
      this.successful(null);
      this.close();
    });
  }

  listCategories(typeId: string): void {
    this.loadingCategories = true;
    categoriesServices
      .list(typeId)
      .then(res => {
        this.categoriesItems = res.map(x => ({ text: x.denomination, value: x.id }));
      })
      .finally(() => {
        this.loadingCategories = false;
      });
  }
  listTypes(): void {
    this.loadingTypes = true;
    const pagingParams = new PagingParams(1, 25);
    const params = new URLSearchParams();
    params.append('pageNumber', pagingParams.pageNumber.toString());
    params.append('pageSize', pagingParams.pageSize.toString());
    params.append('isEnable', 'true');
    typesServices
      .list(params)
      .then(res => {
        this.typesItems = res.data.map(x => ({ text: x.denomination, value: x.id }));
      })
      .finally(() => {
        this.loadingTypes = false;
      });
  }
  resetForm(): void {
    const form = this.$refs.form as Vue & { resetValidation: () => void };
    this.productFormValues = new ProductFormValues();
    this.categoriesItems = [];
    this.typesItems = [];
    this.editMode = false;
    form.resetValidation();
  }
  close(): void {
    this.resetForm();
    this.dialog = false;
  }
}
</script>

<style scoped></style>
