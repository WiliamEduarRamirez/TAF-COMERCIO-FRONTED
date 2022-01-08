<template>
  <v-row>
    <v-col cols="12">
      <v-btn @click="redirectTypes"> Regresar </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class CategoriesHeader extends Vue {
  redirectTypes(): void {
    this.$router.push({ path: `/admin/types` });
  }
}
</script>

<style scoped></style>
