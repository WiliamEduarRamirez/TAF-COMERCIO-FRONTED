<template>
  <v-text-field
    v-model="typeQuery"
    class="ml-6 mt-5"
    label="Buscar Tipo"
    style="max-width: 330px"
    @keypress.enter="handleSearch"
    :append-icon="typeQuery ? 'close' : ''"
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
const type = namespace('type');
@Component
export default class SearchType extends Vue {
  /******************* Start - Vuex *******************/
  @type.Getter
  initialLoading!: boolean;
  @type.Getter
  query!: string;
  @type.Mutation
  setQuery!: (query: string) => void;
  @type.Mutation
  setSearchMode!: (val: boolean) => void;

  @type.Action
  loadTypes!: () => Promise<void>;
  @type.Action
  searchEnd!: () => void;
  /******************* End - Vuex *******************/

  get typeQuery(): string {
    return this.query;
  }

  set typeQuery(newValue: string) {
    this.setQuery(newValue);
  }

  handleSearch(): void {
    /* if (!this.$refs.form.validate()) return;*/
    if (this.typeQuery && this.typeQuery !== '') {
      this.setSearchMode(true);
      this.loadTypes();
    }
  }
}
</script>

<style scoped></style>
