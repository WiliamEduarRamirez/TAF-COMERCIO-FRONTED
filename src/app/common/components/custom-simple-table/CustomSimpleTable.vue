<template>
  <v-container fluid tag="section">
    <v-card height="580">
      <v-row no-gutters class="ma-5">
        <v-col :cols="!$vuetify.breakpoint.xs ? '8' : '3'">
          <v-row>
            <v-avatar size="70" class="ml-1 mt-n1" tile color="primary">
              <v-icon dark> mdi-clipboard-text </v-icon>
            </v-avatar>
            <slot v-if="!$vuetify.breakpoint.xs" name="search"></slot>
          </v-row>
        </v-col>
        <v-col class="d-flex justify-end" :cols="!$vuetify.breakpoint.xs ? '4' : '9'">
          <slot name="others"></slot
        ></v-col>
      </v-row>
      <v-divider></v-divider>
      <v-container>
        <slot name="body"></slot>
      </v-container>
    </v-card>
  </v-container>
</template>

<script src='./CustomSimpleTable.ts' lang="ts"></script>

<style scoped></style>
