<template>
  <v-container>
    <v-row>
      <template v-for="n in 4">
        <v-col :key="n" class="mt-2" cols="12">
          <strong>Category {{ n }}</strong>
        </v-col>

        <v-col v-for="j in 6" :key="`${n}${j}`" cols="12" sm="6" md="3">
          <v-card height="150"></v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeComponent extends Vue {}
</script>

<style scoped></style>
