<template>
  <div>
    <v-app-bar app color="white">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-2" color="grey darken-1" size="32"></v-avatar>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class CustomerAuthLayout extends Vue {}
</script>

<style scoped></style>
