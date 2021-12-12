<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view v-if="!appLoading" />
    </v-fade-transition>
    <v-dialog v-model="appLoading" persistent width="450">
      <v-card>
        <v-card-text>
          <div class="text-subtitle-1 text-center">Cargando app...</div>
          <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--      <v-container v-else style="height: 600px">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12"> Cargando app... </v-col>
          <v-col cols="6">
            <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>-->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CustomProgressCircular from '@/app/common/components/custom-progress-circular/CustomProgressCircular.vue';

const user = namespace('user');
@Component({
  components: { CustomProgressCircular }
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
