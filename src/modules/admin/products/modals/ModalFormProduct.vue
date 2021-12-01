<template>
  <v-row justify="center">
    <v-dialog scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> Agregar Producto </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row> </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" @click="close"> Cancelar </v-btn>
          <v-btn
            @click="uploadPhoto"
            class="ma-2"
            :disabled="!valid"
            :loading="loading"
            color="primary"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomDropzone from '@/common/custom-dropzone/CustomDropzone.vue';

@Component({
  components: { CustomDropzone },
})
export default class ProductsList extends Vue {
  loading = false;
  valid = true;
  dialog = false;
  open(): void {
    this.dialog = true;
  }
  close(): void {
    this.dialog = false;
  }
}
</script>

<style scoped></style>
