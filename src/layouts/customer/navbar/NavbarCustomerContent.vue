<template>
  <v-container class="py-0 fill-height">
    <img
      alt="logo-unsch"
      :src="require('@/assets/images/logo-unsch.png')"
      style="width: 145px; height: 65px"
    />
    <template v-if="!$vuetify.breakpoint.smAndDown">
      <v-btn small v-for="link in links" :key="link" text>
        {{ link }}
      </v-btn>
    </template>
    <template v-else>
      <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    </template>
    <v-spacer></v-spacer>
    <v-responsive v-if="!$vuetify.breakpoint.smAndDown" max-width="230">
      <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" fab color="primary" small>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-badge offset-x="20" offset-y="15" color="error" :content="totalItems.toString()">
      <v-btn @click.stop="handleDrawerRight" class="mx-2" fab small color="success">
        <v-icon dark> mdi-cart-variant </v-icon>
      </v-btn>
    </v-badge>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const shoppingCart = namespace('shoppingCart');

@Component
export default class NavbarCustomerContent extends Vue {
  @Prop({ required: true }) handleDrawerRight!: () => void;
  @Prop({ required: true }) handleDrawer!: () => void;
  links: string[] = ['Dashboard', 'Messages'];

  @shoppingCart.Getter
  totalItems!: number;
}
</script>

<style scoped></style>
