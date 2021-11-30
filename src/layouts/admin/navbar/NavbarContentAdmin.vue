<template>
  <v-row>
    <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" small icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class NavbarContentAdmin extends Vue {}
</script>

<style scoped></style>
