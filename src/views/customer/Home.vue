<template>
  <home-component></home-component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/modules/customer/home/HomeComponent.vue';
@Component({
  components: { HomeComponent },
})
export default class Home extends Vue {}
</script>

<style scoped></style>
