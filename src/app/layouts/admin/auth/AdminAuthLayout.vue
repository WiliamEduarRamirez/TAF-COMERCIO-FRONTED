<template>
  <v-app id="inspire">
    <v-main>
      <v-row>
        <v-col class="hidden-sm-and-down" sm="12" md="7">
          <!--          <img
              style="width: 100%; height: 100vh"
              :src="require('@/assets/images/login/img-portada.png')"
              alt="logo-rimac"
            />-->
          <v-img
            :src="require('@/app/assets/images/login/img-portada.jpeg')"
            class="image"
            height="100vh"
          />
        </v-col>
        <v-col sm="12" md="5">
          <v-card-text class="mt-9">
            <template>
              <v-row>
                <v-col align="center">
                  <v-img
                    :src="require('@/app/assets/images/login/logo-rimac.png')"
                    height="100"
                    width="300"
                  />
                </v-col>
              </v-row>
            </template>
            <h1 class="mt-10 text-center text--accent-3 mb-5">{{ title }}</h1>
            <slot></slot>
          </v-card-text>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class CustomerAuthLayout extends Vue {
  @Prop({ required: true }) readonly title!: string;
}
</script>

<style scoped></style>
