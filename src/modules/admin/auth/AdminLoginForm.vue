<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <!--              <v-text-field outlined label="Name" name="Name" prepend-icon="person" type="text" />-->
    <v-text-field
      :disabled="getInitialLoading"
      :rules="rules.email"
      outlined
      v-model="form.email"
      label="Correo Electrónico"
      name="Email"
      prepend-icon="email"
      type="text"
      required
    />
    <v-text-field
      autocomplete="off"
      :disabled="getInitialLoading"
      required
      prepend-icon="lock"
      outlined
      label="Contraseña"
      name="Password"
      v-model="form.password"
      :rules="[rules.required]"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      @keypress.enter="signIn"
    ></v-text-field>
    <div>
      <div class="d-flex justify-space-between">
        <v-checkbox
          :disabled="getInitialLoading"
          v-model="rememberAccount"
          class="mt-n3"
          label="Recordar"
        ></v-checkbox>
        <a
          :class="getInitialLoading ? 'text--disabled avoid-clicks' : ''"
          class="app-link text-decoration-none font-weight-medium mt-n2"
        >
          <!--          @click="forgotPassword"-->
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <!--      <div class="d-flex justify-end"></div>-->
    </div>

    <!--    <div class="mt-n5 d-flex justify-end">
      <a
        @click="signInAD"
        :class="loading ? 'text&#45;&#45;disabled avoid-clicks' : ''"
        class="app-link text-decoration-none font-weight-medium"
      >
        ¿Eres usuario Rimac?
      </a>
    </div>-->

    <div style="width: 100%" class="mt-5 text-center">
      <!--      <div></div>
      <v-btn class="mr-2" @click="signInAD" :disabled="getInitialLoading" color="primary">
        <v-icon left> mdi-send </v-icon>
        Sesión Rimac
      </v-btn>-->
      <v-btn :loading="getInitialLoading" @click="signIn" :disabled="!valid" color="primary">
        <v-icon left> mdi-send</v-icon>
        INGRESAR
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { REGEX_VALID_EMAIL } from '@/constants/validations-config';
import { UserFormValues } from '@/models/user';
import { namespace } from 'vuex-class';
const auth = namespace('auth');

const valueForm: UserFormValues = {
  email: 'admin@gmail.com',
  password: 'P@ssword1998',
};

@Component
export default class AdminLoginForm extends Vue {
  rememberAccount = !!localStorage.getItem('remember-account');
  valid = true;
  rules = {
    required: (v: string): any => !!v || 'La contraseña es requerida',
    email: [
      (v: string): any => !!v || 'Correo electrónico es requerido',
      (v: string): any => REGEX_VALID_EMAIL.test(v) || 'Formato de correo electrónico no válido',
    ],
  };
  form = { ...valueForm };
  showPassword = false;
  loading = false;

  created(): void {
    const email = localStorage.getItem('remember-account');
    this.form = { ...valueForm };
    this.form.email = email || this.form.email;
  }

  @auth.Action
  login!: (creds: UserFormValues) => Promise<void>;

  @auth.Getter
  getInitialLoading!: boolean;

  signIn(): void {
    const form = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (!form) return;
    this.login(this.form);
  }
}
</script>

<style scoped></style>
