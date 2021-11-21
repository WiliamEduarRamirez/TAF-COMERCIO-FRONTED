<template>
  <dashboard-component></dashboard-component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardComponent from '@/modules/admin/dashboard/DashboardComponent.vue';
@Component({
  components: { DashboardComponent },
})
export default class Dashboard extends Vue {}
</script>

<style scoped></style>
