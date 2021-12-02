<template>
  <v-row>
    <v-toolbar-title class="ml-5 mt-1">{{ $route.meta.nameComponent }}</v-toolbar-title>
    <v-spacer></v-spacer>
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
