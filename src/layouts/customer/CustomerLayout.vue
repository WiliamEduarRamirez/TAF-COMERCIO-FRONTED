<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
    ></v-navigation-drawer>
    <v-app-bar height="70" color="white" flat app clipped-right>
      <v-container class="py-0 fill-height">
        <!--        <v-avatar class="mr-2" color="grey darken-1" size="32"> </v-avatar>-->
        <img
          alt="logo-unsch"
          :src="require('@/assets/images/logo-unsch.png')"
          style="width: 145px; height: 65px"
        />
        <!--        <v-img height="70" contain :src="require('@/assets/images/logo-unsch.png')"></v-img>-->
        <!--        class="hidden-md-and-up"-->
        <template v-if="!$vuetify.breakpoint.smAndDown">
          <v-btn small v-for="link in links" :key="link" text>
            {{ link }}
          </v-btn>
        </template>

        <template v-else>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-spacer></v-spacer>
        <v-responsive v-if="!$vuetify.breakpoint.smAndDown" max-width="230">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" fab color="primary" small>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-badge color="error" :content="totalItems.toString()" overlap>
          <v-btn @click.stop="handleDrawerRight" class="mx-2" fab small color="success">
            <v-icon dark> mdi-cart-variant </v-icon>
          </v-btn>
        </v-badge>
        <!--        class="hidden-sm-and-down"-->
      </v-container>

      <!--      <v-btn v-if="!$vuetify.breakpoint.smAndDown" color="error" small class="mr-2">
        Registrarse
      </v-btn>
      <v-btn v-if="!$vuetify.breakpoint.smAndDown" small color="success" class="mr-2">
        Iniciar Sesión
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.smAndDown" class="mr-2" small icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>-->

      <!--     <v-btn class="mr-2" small icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>-->
    </v-app-bar>
    <!--    <v-system-bar app fixed>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>-->
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
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="(tempType, index) in types" :key="index" link>
                  <v-list-item-content>
                    <v-list-item-title> {{ tempType.denomination }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
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
      width="350"
      temporary
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-shopping-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ totalItems.toString() }} articulos</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="handleDrawerRight" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </template>

      <drawer-right-content
        v-if="totalItems !== 0"
        :handle-drawer-right="handleDrawerRight"
      ></drawer-right-content>
      <template v-if="totalItems !== 0" v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" block class="my-2 text-capitalize">
            Verificar ahora (S/.{{ formatDecimal(totalPrice) }})
          </v-btn>
          <v-btn color="primary" outlined block class="my-2 text-capitalize"> Ver Carrito </v-btn>
        </div>
      </template>
      <template v-if="totalItems === 0" v-slot:default>
        <div class="empty-cart-sidebar d-flex flex-column justify-center align-center mt-10">
          <div class="v-avatar mb-8 rounded-0" style="height: 90px; min-width: 90px; width: 90px">
            <img :src="require('@/assets/images/empty-cart.png')" alt="" />
          </div>
          <p class="grey--text text--darken-2 px-5 mx-10 text-center">
            Tu carrito de compras se encuentra vacia. Empieza a comprar
          </p>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
/*import NavbarCustomer from '@/layouts/customer/navbar/NavbarCustomer';*/
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

import { namespace } from 'vuex-class';
import { Type } from '@/models/product';
import DrawerRightContent from '@/layouts/customer/drawer-right/DrawerRightContent.vue';
const type = namespace('type');
const shoppingCart = namespace('shoppingCart');
@Component({
  components: { DrawerRightContent },
})
export default class CustomerLayout extends Vue {
  drawerRight = false;
  items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ];
  links: string[] = ['Dashboard', 'Messages'];
  drawer = false;

  handleDrawerRight(): void {
    this.drawerRight = !this.drawerRight;
  }

  @type.Getter
  types!: Type[];

  @shoppingCart.Getter
  totalItems!: number;

  @shoppingCart.Getter
  totalPrice!: number;
}
</script>

<style scoped>
.empty-cart-sidebar {
  height: 80vh;
}
</style>
