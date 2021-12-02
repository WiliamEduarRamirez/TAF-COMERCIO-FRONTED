<template>
  <div class="text-center">
    <span class="group pa-2">
      <v-icon x-large>info</v-icon>
    </span>
    <div class="ml-7 mt-2 text-h5 font-weight-light">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomMessage extends Vue {
  @Prop({ required: true, type: String }) readonly message!: string;
}
</script>

<style scoped></style>
