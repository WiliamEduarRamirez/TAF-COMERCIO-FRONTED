<template>
  <v-row class="my-5 mx-2">
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <form id="form-checkout">
            <v-card-title>
              <v-row>
                <v-col> Mercado Pago </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    label="Número de la tarjeta"
                    type="text"
                    outlined
                    dense
                    name="cardNumber"
                    id="form-checkout__cardNumber"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    label="Titular de la Targeta"
                    type="text"
                    outlined
                    dense
                    name="cardholderName"
                    id="form-checkout__cardholderName"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    hide-details
                    label="Mes de vencimiento"
                    type="text"
                    outlined
                    dense
                    name="cardExpirationMonth"
                    id="form-checkout__cardExpirationMonth"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    hide-details
                    type="text"
                    outlined
                    label="Año de vencimiento"
                    dense
                    name="cardExpirationYear"
                    id="form-checkout__cardExpirationYear"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    hide-details
                    outlined
                    label="Código de seguridad"
                    dense
                    type="text"
                    name="securityCode"
                    id="form-checkout__securityCode"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    outlined
                    label="E-mail"
                    dense
                    type="email"
                    name="cardholderEmail"
                    id="form-checkout__cardholderEmail"
                  >
                  </v-text-field>
                </v-col>

                <select
                  style="width: 100%; display: none"
                  name="issuer"
                  id="form-checkout__issuer"
                ></select>
                <select
                  style="width: 100%; display: none"
                  name="installments"
                  id="form-checkout__installments"
                ></select>
                <v-col cols="6">
                  <select
                    style="width: 100%"
                    name="identificationType"
                    id="form-checkout__identificationType"
                  ></select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    hide-details
                    outlined
                    label="Nro. Documento"
                    dense
                    type="text"
                    name="identificationNumber"
                    id="form-checkout__identificationNumber"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    :loading="loading"
                    width="250"
                    color="primary"
                    large
                    type="submit"
                    id="form-checkout__submit"
                  >
                    Pagar
                  </v-btn>
                  <!--                  <button type="submit" id="form-checkout__submit">Pagar</button>-->
                </v-col>
                <v-col cols="6">
                  <progress value="0" class="progress-bar">Cargando...</progress>
                </v-col>
              </v-row>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title> Resumen </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <h3>Subtotal:</h3>
                  <h3>S/. {{ formatDecimal(totalPrice) }}</h3>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <h3>Descuento:</h3>
                  <h3>S/. {{ '0' }}</h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class=""></v-divider>
          <v-card-actions>
            <div style="width: 100%" class="d-flex justify-space-between my-3">
              <h2>Total:</h2>
              <h2>S/. {{ formatDecimal(totalPrice) }}</h2>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MercadoPagoPayment } from '@/models/payment';
import paymentsServices from '@/services/payments.services';
import { PUBLIC_KEY_MERCADO_PAGO } from '@/constants/app-constants';
import { User } from '@/models/user';
const shoppingCart = namespace('shoppingCart');
const user = namespace('user');

@Component
export default class PaymentForm extends Vue {
  form = {
    email: '',
    docType: 'DNI',
    docNumber: '73062536',
    cardName: 'Visa',
    cardNumber: '3',
    cardholderName: '',
    cardExpirationMonth: '11',
    cardExpirationYear: '25',
    securityCode: '123',
    issuer: '',
    installments: '',
    postalCode: '05001',
    paymentMethodId: 'visa',
    transactionAmount: 1500,
    description: 'Alguna descripcion',
  };
  cardForm: any = null;
  loading = false;

  @shoppingCart.Getter
  totalPrice!: number;

  @user.Getter
  user!: User | null;

  @shoppingCart.Mutation
  resetShoppingCartItems!: () => void;

  destroyed(): void {
    this.cardForm.unmount();
  }
  created(): void {
    if (!this.user) {
      this.$router.push({ name: 'home' });
    }
  }
  mounted(): void {
    if (!this.user) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mp = new window.MercadoPago(PUBLIC_KEY_MERCADO_PAGO);
    /*TEST-a8f9584b-ce0c-4896-b6bf-c3447910697c*/
    this.cardForm = mp.cardForm({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      amount: this.formatDecimal(this.totalPrice),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número de la tarjeta',
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'Mes de vencimiento',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'Año de vencimiento',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número de documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
        },
        onFormUnmounted: (error: any) => {
          if (error) return console.warn('Form Unmounted handling error: ', error);
        },
        onCardTokenReceived: (error: any[], token: any) => {
          if (error) {
            console.warn('Token handling error test: ', error);
            return;
          }
          console.log('Token available: ', token);
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          this.loading = true;
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = this.cardForm.getCardFormData();

          const processPayment: MercadoPagoPayment = {
            description: 'Descripción del producto',
            docNumber: identificationNumber,
            docType: identificationType,
            email: email,
            paymentMethodId: payment_method_id,
            installments: Number(installments),
            issuerId: issuer_id,
            token: token,
            transactionAmount: Number(amount),
          };

          paymentsServices.create(processPayment).then(() => {
            this.loading = false;
            this.$router.push({ name: 'home' });
            this.$toast('Su compra se realizo correctamente');
            this.resetShoppingCartItems();
          });
        },
        onFetching: () => {
          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar!.removeAttribute('value');
          return () => {
            progressBar!.setAttribute('value', '0');
          };
        },
      },
    });
  }
}
</script>

<style scoped></style>
