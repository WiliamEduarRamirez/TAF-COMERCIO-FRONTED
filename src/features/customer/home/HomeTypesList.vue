<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-list-item v-for="(tempType, index) in types" :key="index" link>
        <v-list-item-content>
          <v-list-item-title> {{ tempType.denomination }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item link color="grey lighten-4">
        <v-list-item-content>
          <v-list-item-title> Refresh </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Type } from '@/app/models/product';
import { namespace } from 'vuex-class';
const type = namespace('type');
@Component
export default class MainTypesList extends Vue {
  @type.Getter
  types!: Type[];
}
</script>

<style scoped></style>
