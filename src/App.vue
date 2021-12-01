<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view v-if="!appLoading" />
      <v-row justify="center" v-else>
        <custom-progress-circular class="d-flex justify-center"></custom-progress-circular>
      </v-row>
    </v-fade-transition>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CustomProgressCircular from '@/common/custom-progress-circular/CustomProgressCircular.vue';

const user = namespace('user');
@Component({
  components: { CustomProgressCircular },
})
export default class App extends Vue {
  @user.Action
  currentUser!: () => Promise<void>;

  @user.Getter
  appLoading!: boolean;

  /*  async created(): Promise<void> {
    await this.currentUser().finally(() => {
      this.loading = false;
    });
  }*/
}
</script>
