<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
    ></v-navigation-drawer>
    <v-app-bar height="70" color="primary" dark dense app>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-2" color="grey darken-1" size="32"></v-avatar>

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

        <!--        class="hidden-sm-and-down"-->

        <v-responsive v-if="!$vuetify.breakpoint.smAndDown" max-width="230">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
        </v-responsive>
      </v-container>

      <v-btn v-if="!$vuetify.breakpoint.smAndDown" color="error" small class="mr-2">
        Registrarse
      </v-btn>
      <v-btn v-if="!$vuetify.breakpoint.smAndDown" small color="success" class="mr-2">
        Iniciar Sesión
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.smAndDown" class="mr-2" small icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <!--     <v-btn class="mr-2" small icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>-->
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col class="mt-16" v-if="$vuetify.breakpoint.mdAndUp" cols="2">
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

          <v-col>
            <!--                 <v-sheet min-height="70vh" rounded="lg"></v-sheet>-->
            <v-container fluid>
              <v-fade-transition mode="out-in">
                <router-view />
              </v-fade-transition>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
/*import NavbarCustomer from '@/layouts/customer/navbar/NavbarCustomer';*/
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

import { namespace } from 'vuex-class';
import { Type } from '@/models/product';
const type = namespace('type');

@Component
export default class CustomerLayout extends Vue {
  links: string[] = ['Dashboard', 'Messages'];
  drawer = false;

  @type.Getter
  types!: Type[];
}
</script>

<style scoped></style>
