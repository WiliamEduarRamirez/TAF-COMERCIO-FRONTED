<template>
  <v-row justify="center">
    <v-dialog v-if="value && name" scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong>
              {{ !status ? 'Habilitar' : 'Deshabilitar' }} {{ value }}
              {{ name }}
            </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <h3>
              ¿Esta seguro que desea {{ !status ? 'Habilitar' : 'Deshabilitar' }} {{ value }}
              {{ name }}?
            </h3>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div style="width: 100%" class="text-center">
            <v-btn :disabled="loading" color="error" @click="close"> Cancelar </v-btn>
            <v-btn @click="onClickModal" class="ml-2" :loading="loading" color="success">
              Aceptar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="./CustomModalChangeStatus.ts" lang="ts"></script>

<style scoped></style>
