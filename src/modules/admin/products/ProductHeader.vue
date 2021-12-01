<template>
  <v-row>
    <v-col class="d-flex justify-end" cols="12">
      <v-btn color="primary" class="mr-3"> Agregar Producto</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProductHeader extends Vue {

}
</script>

<style scoped></style>
