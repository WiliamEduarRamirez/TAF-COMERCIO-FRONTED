<template>
  <v-app-bar app color="white">
    <v-container class="py-0 fill-height">
      <v-avatar class="mr-2" color="grey darken-1" size="32"></v-avatar>

      <!--        class="hidden-md-and-up"-->
      <template v-if="!$vuetify.breakpoint.smAndDown">
        <v-btn small v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
      </template>
      <template v-else>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-spacer></v-spacer>

      <!--        class="hidden-sm-and-down"-->

      <v-responsive v-if="!$vuetify.breakpoint.smAndDown" max-width="230">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-container>

    <v-btn v-if="!$vuetify.breakpoint.smAndDown" small class="mr-2"> Registrarse </v-btn>
    <v-btn v-if="!$vuetify.breakpoint.smAndDown" small class="mr-2"> Iniciar Sesión </v-btn>
    <v-btn v-if="$vuetify.breakpoint.smAndDown" class="mr-2" small icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <!--     <v-btn class="mr-2" small icon>
       <v-icon>mdi-account</v-icon>
     </v-btn>-->
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarCustomer',
  data: () => ({
    links: ['Dashboard', 'Messages'],
  }),
};
</script>

<style scoped></style>
