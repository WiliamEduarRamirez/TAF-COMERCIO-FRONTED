<template>
  <v-app id="inspire">
    <v-navigation-drawer
      id="default-drawer"
      v-model="drawer"
      :mini-variant="mini"
      width="240"
      mini-variant-width="70"
      :expand-on-hover="mini"
      dark
      app
      floating
    >
      <!--      :clipped="mini"-->
      <!--  -->
      <sidebar-content :mini="mini"></sidebar-content>
    </v-navigation-drawer>

    <v-app-bar height="70" color="primary" dark dense app>
      <!--      :clipped-left="mini"-->

      <v-btn @click="handleDrawer" icon>
        <v-icon>{{ drawer && !mini ? 'mdi-menu' : !drawer ? 'mdi-menu' : 'mdi-close' }}</v-icon>
      </v-btn>

      <!--      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->
      <navbar-content-admin></navbar-content-admin>
    </v-app-bar>
    <v-main :class="!$vuetify.theme.dark ? 'grey lighten-4' : ''">
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
import SidebarContent from '@/app/layouts/admin/sidebar/SidebarContent.vue';
import NavbarContentAdmin from '@/app/layouts/admin/navbar/NavbarContentAdmin.vue';
@Component({
  components: { NavbarContentAdmin, SidebarContent },
})
export default class AdminLayout extends Vue {
  drawer = true;
  mini = false;
  handleDrawer(): void {
    if (this.$vuetify.breakpoint.mdAndDown) {
      if (this.mini) {
        this.mini = false;
      }
      this.drawer = !this.drawer;
    } else {
      this.mini = !this.mini;
    }
  }
}
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
