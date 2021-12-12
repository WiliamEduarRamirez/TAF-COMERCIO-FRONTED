<template>
  <v-container class="py-0 fill-height">
    <customer-login-auth ref="customer-login-auth"></customer-login-auth>

    <img
      @click="onClickHome"
      alt="logo-unsch"
      :src="require('@/app/assets/images/logo-unsch.png')"
      style="width: 145px; height: 65px"
    />
    <!--    <template v-if="!$vuetify.breakpoint.smAndDown">
      <v-btn small v-for="link in links" :key="link" text>
        {{ link }}
      </v-btn>
    </template>-->
    <v-btn @click="onClickHome" class="text-capitalize" text> Inicio </v-btn>
    <template v-if="$vuetify.breakpoint.smAndDown">
      <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    </template>
    <v-spacer></v-spacer>
    <v-responsive v-if="!$vuetify.breakpoint.smAndDown" max-width="230">
      <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
    <v-badge offset-x="28" offset-y="15" color="error" :content="totalItems.toString()">
      <v-btn
        @click.stop="handleDrawerRight"
        class="mx-4"
        fab
        small
        :color="totalItems === 0 ? '#D7DCE6' : 'success'"
      >
        <v-icon dark> mdi-cart-variant </v-icon>
      </v-btn>
    </v-badge>
    <v-btn v-if="!user" @click="openModalLogin" fab color="#D7DCE6" small>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn v-else fab color="primary" small>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CustomerLoginAuth from '@/app/layouts/customer/auth/CustomerLoginAuth.vue';
import { User } from '@/app/models/user';
const shoppingCart = namespace('shoppingCart');
const user = namespace('user');
@Component({
  components: { CustomerLoginAuth },
})
export default class NavbarCustomerContent extends Vue {
  @Prop({ required: true }) handleDrawerRight!: () => void;
  @Prop({ required: true }) handleDrawer!: () => void;
  links: string[] = ['Dashboard', 'Messages'];

  @shoppingCart.Getter
  totalItems!: number;

  @user.Getter
  user!: User | null;

  onClickHome(): void {
    this.$router.push({ name: 'home' });
  }

  openModalLogin(): void {
    const modal = this.$refs['customer-login-auth'] as Vue & { open: () => void };
    modal.open();
  }
}
</script>

<style scoped></style>
