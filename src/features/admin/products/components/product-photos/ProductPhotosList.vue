<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col> Fotos del producto </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProductPhotosList extends Vue {}
</script>

<style scoped></style>
