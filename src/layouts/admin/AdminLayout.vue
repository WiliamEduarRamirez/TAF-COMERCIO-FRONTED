<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <sidebar-content></sidebar-content>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <navbar-content-admin></navbar-content-admin>
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
import SidebarContent from '@/layouts/admin/sidebar/SidebarContent.vue';
import NavbarContentAdmin from '@/layouts/admin/navbar/NavbarContentAdmin.vue';
@Component({
  components: { NavbarContentAdmin, SidebarContent },
})
export default class AdminLayout extends Vue {
  drawer = true;
}
</script>

<style scoped></style>
