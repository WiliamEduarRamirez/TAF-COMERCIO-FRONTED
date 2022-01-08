<template>
  <v-row justify="center">
    <v-dialog scrollable persistent v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6" :style="{ color: $vuetify.theme.themes.dark.primary }">
            <strong> {{ !editMode ? 'AGREGAR TIPO' : 'EDITAR TIPO' }} </strong>
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    v-model.trim="form.denomination"
                    hide-details="auto"
                    :disabled="loading"
                    required
                    @keypress.enter.prevent="actionModal"
                    :rules="[globalRules.required]"
                    label="Nombres*"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    v-model.trim="form.description"
                    hide-details="auto"
                    :disabled="loading"
                    required
                    @keypress.enter.prevent="actionModal"
                    :rules="[globalRules.required]"
                    label="Descripción*"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="text-center" style="width: 100%">
            <v-btn :disabled="loading" color="error" @click="close" class="mr-4">Cancelar</v-btn>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              :color="!editMode ? 'success' : 'primary'"
              @click="actionModal"
            >
              {{ !editMode ? 'Agregar' : 'Editar' }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="./ModalFormType.ts" lang="ts"></script>

<style scoped></style>
