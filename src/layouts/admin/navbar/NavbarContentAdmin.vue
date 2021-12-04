<template>
  <v-row>
    <!--    :style="{ color: $vuetify.theme.themes.light.primary }"-->
    <v-toolbar-title class="ml-5 mt-1">
      {{ $route.meta.nameComponent }}
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn class="mt-n1 mr-n3" @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
      <v-icon>
        {{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
      </v-icon>
    </v-btn>

    <account></account>
  </v-row>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import Account from '@/layouts/admin/navbar/components/Account.vue';
@Component({
  components: { Account },
})
export default class NavbarContentAdmin extends Vue {}
</script>

<style scoped></style>
