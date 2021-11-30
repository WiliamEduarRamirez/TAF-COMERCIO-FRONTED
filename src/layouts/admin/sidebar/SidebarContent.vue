<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class SidebarContent extends Vue {
  items = [
    {
      text: 'Dashboard',
      icon: 'mdi-map-marker-radius',
      href: '/admin/dashboard',
    },
    {
      text: 'Productos',
      icon: 'mdi-clipboard-list',
      href: '/admin/products',
    },
    {
      text: 'Categorias',
      icon: 'mdi-file-document',
      href: '/dashboard/reports',
    },
    {
      text: 'Tipos',
      icon: 'mdi-file-document',
      href: '/dashboard/reports',
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
      text: 'Reportes',
      icon: 'mdi-file-document',
      href: '/dashboard/reports',
    },
  ];
}
</script>

<style scoped></style>
