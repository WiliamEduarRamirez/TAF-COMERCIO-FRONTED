<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
    ></v-navigation-drawer>
    <v-app-bar height="70" color="white" flat app clipped-right>
      <navbar-customer-content
        :handle-drawer="handleDrawer"
        :handle-drawer-right="handleDrawerRight"
      ></navbar-customer-content>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row class="my-3">
          <v-col cols="6" sm="12" md="6"> </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-row>
              <div class="text-center">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text dark v-bind="attrs" v-on="on"> Home </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" link>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="text-center">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text dark v-bind="attrs" v-on="on"> Pages </v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" link>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="text-center">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" text dark v-bind="attrs" v-on="on"> User Account </v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" link>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-3" v-if="$vuetify.breakpoint.mdAndUp" cols="2">
            <main-types-list></main-types-list>
          </v-col>
          <v-col class="mt-n15">
            <v-container fluid>
              <v-fade-transition mode="out-in">
                <router-view />
              </v-fade-transition>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer
      class="right-drawer"
      v-model="drawerRight"
      app
      clipped
      right
      width="380"
      temporary
    >
      <template v-slot:prepend>
        <drawer-right-header :handle-drawer-right="handleDrawerRight"></drawer-right-header>
        <v-divider></v-divider>
      </template>
      <drawer-right-content
        v-if="totalItems !== 0"
        :handle-drawer-right="handleDrawerRight"
      ></drawer-right-content>
      <template v-if="totalItems === 0" v-slot:default>
        <drawer-right-empty-content></drawer-right-empty-content>
      </template>
      <template v-if="totalItems !== 0" v-slot:append>
        <drawer-right-footer></drawer-right-footer>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

import { namespace } from 'vuex-class';
import DrawerRightContent from '@/layouts/customer/drawer-right/DrawerRightContent.vue';
import NavbarCustomerContent from '@/layouts/customer/navbar/NavbarCustomerContent.vue';
import DrawerRightHeader from '@/layouts/customer/drawer-right/DrawerRightHeader.vue';
import DrawerRightFooter from '@/layouts/customer/drawer-right/DrawerRightFooter.vue';
import MainTypesList from '@/layouts/customer/main/MainTypesList.vue';
import DrawerRightEmptyContent from '@/layouts/customer/drawer-right/DrawerRightEmptyContent.vue';

const shoppingCart = namespace('shoppingCart');
@Component({
  components: {
    DrawerRightEmptyContent,
    MainTypesList,
    DrawerRightFooter,
    DrawerRightHeader,
    NavbarCustomerContent,
    DrawerRightContent,
  },
})
export default class CustomerLayout extends Vue {
  drawerRight = false;
  items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ];
  drawer = false;
  handleDrawerRight(): void {
    this.drawerRight = !this.drawerRight;
  }
  handleDrawer(): void {
    this.drawer = !this.drawer;
  }
  @shoppingCart.Getter
  totalItems!: number;
}
</script>

<style scoped></style>
