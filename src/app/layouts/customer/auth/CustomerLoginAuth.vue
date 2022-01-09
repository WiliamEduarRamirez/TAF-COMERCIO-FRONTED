<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable width="500">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <h3 class="mb-2">Bienvenido al comercio electrónico</h3>
              <h5 class="font-600 grey--text text--darken-3 text-sm">
                Inicie sesión con correo electrónico &amp; contraseña
              </h5>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    hide-details="auto"
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
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details="auto"
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
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    style="width: 100%"
                    color="primary"
                    :loading="getInitialLoading"
                    @click="signIn"
                    :disabled="!valid"
                  >
                    Ingresar
                  </v-btn>
                </v-col>
                <v-col class="my-n2" cols="12">
                  <div class="d-flex align-center my-1">
                    <hr
                      role="separator"
                      aria-orientation="horizontal"
                      class="v-divider theme--light"
                    />
                    <span class="mx-4">o</span>
                    <hr
                      role="separator"
                      aria-orientation="horizontal"
                      class="v-divider theme--light"
                    />
                  </div>
                  <div class="text-14 text-center mt-2">
                    ¿No tienes cuenta?
                    <a @click="redirectRegister" class="font-600"> Inscribirse </a>
                  </div>
                </v-col>
                <!--              <v-col cols="12"> </v-col>-->
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-2">
          <div class="text-center my-2" style="width: 100%">
            <span class="grey--text text--darken-1">
              Olvidó su contraseña
              <a aria-current="page" class="ms-2 font-600"> Restablecer </a>
            </span>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { UserFormValues } from '@/app/models/user';
import { AxiosError } from 'axios';
import { REGEX_VALID_EMAIL } from '@/app/common/constants/validations-config';

const auth = namespace('auth');

const valueForm: UserFormValues = {
  email: 'wiliam@gmail.com',
  password: 'P@ssword1998',
  isCustomer: true
};

@Component
export default class CustomerLoginAuth extends Vue {
  dialog = false;
  valid = true;
  rules = {
    required: (v: string): any => !!v || 'La contraseña es requerida',
    email: [
      (v: string): any => !!v || 'Correo electrónico es requerido',
      (v: string): any => REGEX_VALID_EMAIL.test(v) || 'Formato de correo electrónico no válido'
    ]
  };
  form = { ...valueForm };
  showPassword = false;

  /*  created(): void {
    this.form = { ...valueForm };
    this.form.email = email || this.form.email;
  }*/
  /*  @user.Mutation
  setUser!: (user: User | null) => void;*/

  @auth.Action
  login!: (creds: UserFormValues) => Promise<void>;

  @auth.Getter
  getInitialLoading!: boolean;

  async signIn(): Promise<void> {
    const form = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    if (!form) return;
    await this.login(this.form)
      .then(() => {
        this.close();
      })
      .catch((err: AxiosError) => {
        console.log(err);
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
  open(): void {
    this.dialog = true;
  }
  close(): void {
    this.dialog = false;
  }
  redirectRegister(): void {
    this.$router.push({ name: 'register-customer' });
  }
}
</script>

<style scoped></style>
