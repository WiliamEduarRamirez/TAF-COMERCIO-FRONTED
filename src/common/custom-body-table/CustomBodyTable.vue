<template>
  <v-container fluid tag="section">
    <v-card height="580">
      <v-row no-gutters class="ma-4">
        <v-avatar size="70" class="mt-n5" tile color="primary">
          <v-icon dark> mdi-clipboard-text </v-icon>
        </v-avatar>
        <div class="hidden-sm-and-down ml-7 mt-2 text-h5 font-weight-light">
          Listado de {{ title }}
        </div>
        <div class="hidden-md-and-up ml-7 mt-2 text-h5 font-weight-light">{{ title }}</div>
      </v-row>

      <v-container>
        <slot></slot>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomBodyTable extends Vue {
  @Prop({ required: true }) readonly title!: string;
}
</script>

<style scoped></style>
