<template>
  <div>
    <!--    <div class="mt-4" :style="{ height: '48px', color: $vuetify.theme.themes.light.primary }">
      <h1 class="mt-2 text-center">{{ !mini ? 'Ecommerce' : 'E' }}</h1>
    </div>
    <v-divider></v-divider>-->
    <template>
      <v-list nav>
        <v-list-item>
          <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
              max-height="40"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="'Eccomerce'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="mt-n3" />
    </template>
    <!--    <v-divider v-if="!mini"></v-divider>-->
    <div
      v-if="!mini"
      class="mt-4"
      :style="{ height: '55px', color: $vuetify.theme.themes.light.primary }"
    >
      <h1 class="mt-2 text-center">Navegación</h1>
    </div>
    <v-divider></v-divider>
    <template>
      <v-list nav rounded>
        <v-list-item-group color="primary">
          <!--          <v-list-item inactive>
            <v-list-item-icon> E </v-list-item-icon>
            <v-list-item-content> Ecommerce </v-list-item-content>
          </v-list-item>-->
          <v-list-item :to="{ path: item.href }" link v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <template>
                <v-icon v-if="item.icon" v-text="item.icon"></v-icon>
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
import { Prop, Vue, Component } from 'vue-property-decorator';

@Component
export default class SidebarContent extends Vue {
  @Prop({ required: true }) readonly mini!: boolean;
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
