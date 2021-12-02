<template>
  <v-menu bottom left min-width="150" offset-y origin="top right" transition="scale-transition">
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list>
      <!--        <div class="hidden-md-and-up">-->
      <div>
        <v-list-item>
          <v-list-item-title>
            <strong> {{ 'Nombre Usuario' }}</strong>
          </v-list-item-title>
        </v-list-item>
        <v-list-item class="mt-n7">
          <v-list-item-title>
            <small>{{ 'Rol' }}</small>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <v-list-item @click="() => {}">
        <v-list-item-title><v-icon>mdi-cog</v-icon> Cambiar Contraseña</v-list-item-title>
      </v-list-item>
      <!--        <v-list-item @click="() => {}">
        <v-list-item-title><v-icon>mdi-account</v-icon>Perfil</v-list-item-title>
      </v-list-item>-->
      <v-list-item @click="logout">
        <v-list-item-title><v-icon>mdi-logout</v-icon> Salir</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const auth = namespace('auth');

@Component
export default class Account extends Vue {
  @auth.Action
  logout!: () => void;
}
</script>

<style scoped></style>
