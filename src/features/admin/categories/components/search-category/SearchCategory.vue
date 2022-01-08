<template>
  <v-text-field
    v-model="categoryQuery"
    class="ml-6 mt-5"
    label="Buscar Categoria"
    style="max-width: 330px"
    @keypress.enter="handleSearch"
    :append-icon="categoryQuery ? 'close' : ''"
    @click:append="searchEnd"
    :disabled="initialLoading"
  >
    <template v-slot:append-outer>
      <v-btn @click="handleSearch" class="mt-n3" fab small elevation="2" height="44" width="44">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const category = namespace('category');
@Component
export default class SearchCategory extends Vue {
  /******************* Start - Vuex *******************/
  @category.Getter
  initialLoading!: boolean;
  @category.Getter
  query!: string;
  @category.Mutation
  setQuery!: (query: string) => void;
  @category.Mutation
  setSearchMode!: (val: boolean) => void;

  @category.Action
  loadCategories!: () => Promise<void>;
  @category.Action
  searchEnd!: () => void;
  /******************* End - Vuex *******************/

  get categoryQuery(): string {
    return this.query;
  }

  set categoryQuery(newValue: string) {
    this.setQuery(newValue);
  }

  handleSearch(): void {
    /* if (!this.$refs.form.validate()) return;*/
    if (this.categoryQuery && this.categoryQuery !== '') {
      this.setSearchMode(true);
      this.loadCategories();
    }
  }
}
</script>

<style scoped></style>
