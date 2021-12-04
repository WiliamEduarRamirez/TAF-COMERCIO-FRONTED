<template>
  <home-component></home-component>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/modules/customer/home/HomeComponent.vue';
import { namespace } from 'vuex-class';
const type = namespace('type');
@Component({
  components: { HomeComponent },
})
export default class Home extends Vue {
  mounted(): void {
    console.log('entra aqui');
    this.loadTypes();
  }

  @type.Action
  loadTypes!: () => Promise<void>;
}
</script>

<style scoped></style>
