<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <div class="mt-4" :style="{ height: '48px', color: $vuetify.theme.themes.light.primary }">
        <h1 class="mt-2 text-center">Navegación</h1>
      </div>
      <v-divider></v-divider>
      <template>
        <v-list rounded>
          <v-list-item-group color="primary">
            <v-list-item :to="{ path: item.href }" link v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <template>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon v-if="item.icon" v-text="item.icon"></v-icon>
                      </span>
                    </template>
                    <span v-text="item.text"></span>
                  </v-tooltip>
                </template>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" small icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <!--  -->
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class AdminLayout extends Vue {
  drawer = false;
  items = [
    {
      text: 'Mapa',
      icon: 'mdi-map-marker-radius',
      href: '/dashboard/maps',
    },
    {
      text: 'Casos',
      icon: 'mdi-clipboard-list',
      href: '/dashboard/cases',
    },
    {
      text: 'Usuarios',
      icon: 'mdi-account',
      href: '/dashboard/users',
    },
    {
      text: 'Proveedores',
      icon: 'mdi-briefcase-plus',
      href: '/dashboard/providers',
    },
    {
      text: 'Clínicas',
      icon: 'mdi-domain',
      href: '/dashboard/clinics',
    },
    {
      text: 'Reportes',
      icon: 'mdi-file-document',
      href: '/dashboard/reports',
    },
    {
      text: 'Horarios',
      icon: 'mdi-calendar-clock',
      href: '/dashboard/schedule',
    },
    {
      text: 'Casos',
      icon: 'mdi-clipboard-list',
      href: '/dashboard/provider-cases',
    },
  ];
}
</script>

<style scoped></style>
