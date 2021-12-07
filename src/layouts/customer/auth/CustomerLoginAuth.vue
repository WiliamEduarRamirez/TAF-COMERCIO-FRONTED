<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable width="500">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <h3 class="mb-2">Bienvenido al comercio electrónico</h3>
              <h5 class="font-600 grey--text text--darken-3 text-sm">
                Inicie sesión con correo electrónico &amp; contraseña
              </h5>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field outlined hide-details label="Correo Electronico"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field outlined hide-details label="Contraseña"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn style="width: 100%" color="primary" @click="close"> Ingresar </v-btn>
              </v-col>
              <v-col class="my-n2" cols="12">
                <div class="d-flex align-center my-1">
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="v-divider theme--light"
                  />
                  <span class="mx-4">o</span>
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="v-divider theme--light"
                  />
                </div>
                <div class="text-14 text-center mt-2">
                  ¿No tienes cuenta?
                  <a @click="redirectRegister" class="font-600"> Inscribirse </a>
                </div>
              </v-col>
              <!--              <v-col cols="12"> </v-col>-->
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-2">
          <div class="text-center my-2" style="width: 100%">
            <span class="grey--text text--darken-1">
              Olvidó su contraseña
              <a aria-current="page" class="ms-2 font-600"> Restablecer </a>
            </span>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CustomerLoginAuth extends Vue {
  dialog = false;

  open(): void {
    this.dialog = true;
  }
  close(): void {
    this.dialog = false;
  }
  redirectRegister(): void {
    this.$router.push({ name: 'register-customer' });
  }
}
</script>

<style scoped></style>
