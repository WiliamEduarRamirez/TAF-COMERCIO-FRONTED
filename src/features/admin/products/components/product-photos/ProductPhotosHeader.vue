<template>
  <v-row>
    <v-col class="d-flex justify-end" cols="12">
      <v-btn color="info" small> <v-icon left>mdi-plus-circle</v-icon> Agregar Photo </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProductPhotosHeader extends Vue {}
</script>

<style scoped></style>
