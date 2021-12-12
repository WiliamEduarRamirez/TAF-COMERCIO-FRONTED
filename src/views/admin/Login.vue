<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images-template/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">UNSCH</h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">Comercio Electronico</p>
          <p class="mb-2">Please sign-in to your account and start the adventure</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :disabled="getInitialLoading"
              v-model="form.email"
              outlined
              label="Email"
              placeholder="john@example.com"
              class="mb-3"
              :rules="rules.email"
            ></v-text-field>

            <v-text-field
              :disabled="getInitialLoading"
              v-model="form.password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="isPasswordVisible = !isPasswordVisible"
              :rules="[rules.required]"
              @keypress.enter="signIn"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                v-model="rememberAccount"
                label="Recordarme"
                hide-details
                :disabled="getInitialLoading"
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                :class="getInitialLoading ? 'text--disabled avoid-clicks' : ''"
                href="javascript:void(0)"
                class="mt-1"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <v-btn
              :loading="getInitialLoading"
              :disabled="!valid"
              @click="signIn"
              block
              color="primary"
              class="mt-6"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <!--        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> New on our platform? </span>
          <router-link :to="{ name: 'pages-register' }"> Create an account </router-link>
        </v-card-text>-->

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="
        require(`@/assets/images-template/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)
      "
      alt="mask"
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images-template/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images-template/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserFormValues } from '@/models/user';
import { AxiosError } from 'axios';
import { namespace } from 'vuex-class';
import { REGEX_VALID_EMAIL } from '@/app/common/constants/validations-config';
const auth = namespace('auth');

const valueForm: UserFormValues = {
  email: 'admin@gmail.com',
  password: 'P@ssword1998',
};

@Component
export default class Login extends Vue {
  isPasswordVisible = false;
  rememberAccount = !!window.localStorage.getItem('remember-account');
  valid = true;
  rules = {
    required: (v: string): any => !!v || 'La contraseña es requerida',
    email: [
      (v: string): any => !!v || 'Correo electrónico es requerido',
      (v: string): any => REGEX_VALID_EMAIL.test(v) || 'Formato de correo electrónico no válido',
    ],
  };
  form = { ...valueForm };
  loading = false;
  socialLink = [
    {
      icon: 'mdi-facebook',
      color: '#4267b2',
      colorInDark: '#4267b2',
    },
    {
      icon: 'mdi-twitter',
      color: '#1da1f2',
      colorInDark: '#1da1f2',
    },
    {
      icon: 'mdi-github',
      color: '#272727',
      colorInDark: '#fff',
    },
    {
      icon: 'mdi-google',
      color: '#db4437',
      colorInDark: '#db4437',
    },
  ];

  created(): void {
    const email = window.localStorage.getItem('remember-account');
    this.form = { ...valueForm };
    this.form.email = email || this.form.email;
  }

  @auth.Action
  login!: (creds: UserFormValues) => Promise<void>;

  @auth.Getter
  getInitialLoading!: boolean;

  async signIn(): Promise<void> {
    const form = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (!form) return;
    if (this.rememberAccount) {
      window.localStorage.setItem('remember-account', this.form.email);
    } else {
      window.localStorage.removeItem('remember-account');
    }
    await this.login(this.form).catch((err: AxiosError) => {
      const defaultError = 'Ocurrio un error, intente nuevamente';
      if (!err.response) {
        this.$toast.error(defaultError);
        return;
      }
      switch (err.response?.status) {
        case 401:
          this.$toast.error(err.response?.data?.message || defaultError);
          break;
      }
    });
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/auth.scss';
</style>
