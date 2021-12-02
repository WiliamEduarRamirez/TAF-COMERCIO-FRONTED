<template>
  <v-row justify="center">
    <v-dialog scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> AGREGAR PRODUCTO </strong>
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
                  @change="listCategories(productFormValues.typeId)"
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
            @click="addProduct"
            class="ma-2"
            :disabled="!valid || loadingTypes || loadingCategories"
            :loading="loading"
            color="success"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import CustomDropzone from '@/common/custom-dropzone/CustomDropzone.vue';
import { Product, ProductFormValues } from '@/models/product';
import categoriesServices from '@/services/categories.services';
import typesServices from '@/services/types.services';
import productsServices from '@/services/products.services';

interface Item {
  text: string;
  value: string;
}

@Component({
  components: { CustomDropzone },
})
export default class ProductsList extends Vue {
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
  successful(product: Product): Product {
    return product;
  }

  open(product: Product | null): void {
    this.editMode = !!product;
    this.listTypes();
    /* this.listCategories();*/
    this.dialog = true;
  }
  addProduct(): void {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    if (!form.validate()) return;
    this.loading = true;
    productsServices.add(this.productFormValues).then((res) => {
      this.loading = false;
      this.$toast.success('Producto agregado correctamente');
      this.successful(res);
      this.close();
    });
  }
  listCategories(typeId: string): void {
    this.loadingCategories = true;
    categoriesServices
      .list(typeId)
      .then((res) => {
        this.categoriesItems = res.map((x) => ({ text: x.denomination, value: x.id }));
      })
      .finally(() => {
        this.loadingCategories = false;
      });
  }
  listTypes(): void {
    this.loadingTypes = true;
    typesServices
      .list()
      .then((res) => {
        this.typesItems = res.map((x) => ({ text: x.denomination, value: x.id }));
      })
      .finally(() => {
        this.loadingTypes = false;
      });
  }
  resetForm(): void {
    const form = this.$refs.form as Vue & { resetValidation: () => void };
    form.resetValidation();
    this.productFormValues = new ProductFormValues();
  }
  close(): void {
    this.resetForm();
    this.dialog = false;
  }
}
</script>

<style scoped></style>
