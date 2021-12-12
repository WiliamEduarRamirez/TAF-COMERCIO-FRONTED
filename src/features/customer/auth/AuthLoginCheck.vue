<template>
  <v-container>
    <div class="empty-cart-sidebar d-flex flex-column justify-center align-center mt-10">
      <v-card width="450">
        <v-card-text>
          <v-row>
            <v-col v-if="!loginMode" class="text-center" cols="12">
              <h1 class="my-1">¡Hola! Para comprar,</h1>
              <h1 class="my-3">ingresa a tu cuenta</h1>
            </v-col>
            <div v-if="loginMode" style="width: 100%">
              <v-col cols="12">
                <h1 class="my-3">Ingresa tu email o usuario</h1>
              </v-col>
              <v-col cols="12">
                <v-text-field hide-details="auto" outlined label="email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field hide-details="auto" outlined label="password"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  @click="() => (loginMode = true)"
                  class="text-capitalize"
                  color="primary"
                  style="width: 100%"
                >
                  Ingresar
                </v-btn>
              </v-col>
            </div>
            <v-col cols="12">
              <v-btn
                @click="redirectRegister"
                class="text-capitalize"
                color="primary"
                :text="loginMode"
                style="width: 100%"
              >
                {{ !loginMode ? 'Soy Nuevo' : 'Crear cuenta' }}
              </v-btn>
            </v-col>
            <v-col v-if="!loginMode" cols="12">
              <v-btn
                @click="() => (loginMode = true)"
                class="text-capitalize"
                text
                color="primary"
                style="width: 100%"
              >
                Ya tengo cuenta
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthLoginCheck extends Vue {
  loginMode = false;

  redirectRegister(): void {
    this.$router.push({ name: 'register-customer' });
  }
}
</script>

<style scoped>
.empty-cart-sidebar {
  height: 70vh;
}
</style>
