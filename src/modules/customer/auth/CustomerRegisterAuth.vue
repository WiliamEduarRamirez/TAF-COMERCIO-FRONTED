<template>
  <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
    <v-card class="mt-10" width="500">
      <v-card-title>
        <v-row>
          <v-col class="text-center" cols="12">
            <h3 class="mb-1" :style="{ color: this.$vuetify.theme.themes.dark.primary }">
              Crea tu cuenta
            </h3>
            <h5 class="text-sm font-600 grey--text text--darken-4">
              Por favor complete todos los formularios para continuar
            </h5>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nombre Completo"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Apellidos"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Correo Electronico"> </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Documento"> </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Nro. Documento"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Contraseña"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Confirmar Contraseña"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <div>Al registrarse, acepta los<a> Términos &amp; Condiciones </a></div>
            </v-col>
            <v-col cols="12">
              <v-btn style="width: 100%" color="primary"> Crear una Cuenta </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <div class="py-4">
      <div class="text-center">
        <span class="grey--text text--darken-1">
          ¿Ya tienes una cuenta?
          <a href="#" class="ms-2 grey--text text--darken-4 font-600"> Ingresar </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerRegisterAuth',
};
</script>

<style scoped>
.bg-body {
  background-color: #f6f9fc;
}
</style>
