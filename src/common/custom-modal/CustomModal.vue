<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable persistent width="500">
      <v-card>
        <v-card-title class="text-h5" :style="{ color: $vuetify.theme.themes.dark.primary }">
          {{ title }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="ma-2">
            {{ message }}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div style="width: 100%" class="text-center">
            <v-btn color="error" @click="close"> Cancelar </v-btn>
            <v-btn class="ml-3" color="success" @click="actionModal"> Aceptar </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomModal extends Vue {
  dialog = false;

  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly message!: string;

  @Emit('on-close-event')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCloseEvent(): void {}

  @Emit('on-accept-event')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAcceptEvent(): void {}

  actionModal(): void {
    this.onAcceptEvent();
    this.close();
  }

  open(): void {
    this.dialog = true;
  }

  close(): void {
    this.onCloseEvent();
    this.dialog = false;
  }
}
</script>

<style scoped></style>
