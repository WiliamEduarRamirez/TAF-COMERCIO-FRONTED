<template>
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
      <!--      <v-divider></v-divider>-->
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const shoppingCart = namespace('shoppingCart');

@Component
export default class DrawerRightHeader extends Vue {
  @Prop({ required: true }) handleDrawerRight!: () => void;
  @shoppingCart.Getter
  totalItems!: number;
}
</script>

<style scoped></style>
